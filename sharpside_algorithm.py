"""
Sharpside AI - NBA Betting Algorithm
Core engine for analyzing NBA games and generating betting recommendations
"""

import json
from datetime import datetime, timedelta
from typing import List, Dict, Tuple

class SharpsideAlgorithm:
    """
    NBA Betting Analysis Algorithm
    Analyzes games based on multiple factors and generates confidence-rated picks
    """
    
    def __init__(self):
        self.confidence_threshold = 3.0
        self.parlay_confidence_threshold = 4.0
        
    def analyze_game(self, game_data: Dict) -> Dict:
        """
        Main analysis function for a single NBA game
        Returns comprehensive betting analysis with confidence scores
        """
        
        # Calculate individual factor scores
        matchup_score = self._analyze_matchup(game_data)
        form_score = self._analyze_recent_form(game_data)
        rest_score = self._analyze_rest_advantage(game_data)
        injury_score = self._analyze_injury_impact(game_data)
        pace_score = self._analyze_pace_totals(game_data)
        home_court_score = self._analyze_home_court(game_data)
        line_value_score = self._analyze_line_value(game_data)
        public_fade_score = self._analyze_public_betting(game_data)
        
        # Composite scoring
        moneyline_confidence = self._calculate_moneyline_confidence(
            matchup_score, form_score, rest_score, injury_score, home_court_score, line_value_score
        )
        
        spread_confidence = self._calculate_spread_confidence(
            matchup_score, form_score, rest_score, injury_score, home_court_score, public_fade_score
        )
        
        total_confidence = self._calculate_total_confidence(
            pace_score, matchup_score, form_score
        )
        
        # Find best bet type
        best_bet = self._determine_best_bet(
            moneyline_confidence, spread_confidence, total_confidence, game_data
        )
        
        # Check for outlier props
        prop_opportunities = self._find_prop_outliers(game_data)
        
        return {
            'game_id': game_data['game_id'],
            'matchup': f"{game_data['away_team']} @ {game_data['home_team']}",
            'game_time': game_data['game_time'],
            'moneyline': {
                'confidence': round(moneyline_confidence, 1),
                'pick': game_data['home_team'] if moneyline_confidence > 2.5 else game_data['away_team'],
                'odds': game_data.get('moneyline_odds', 'N/A'),
                'reasoning': self._generate_reasoning('moneyline', moneyline_confidence, game_data)
            },
            'spread': {
                'confidence': round(spread_confidence, 1),
                'pick': f"{game_data['home_team']} {game_data.get('spread', 'N/A')}",
                'odds': game_data.get('spread_odds', '-110'),
                'reasoning': self._generate_reasoning('spread', spread_confidence, game_data)
            },
            'total': {
                'confidence': round(total_confidence, 1),
                'pick': 'Over' if pace_score > 3.0 else 'Under',
                'line': game_data.get('total_line', 'N/A'),
                'odds': game_data.get('total_odds', '-110'),
                'reasoning': self._generate_reasoning('total', total_confidence, game_data)
            },
            'best_bet': best_bet,
            'props': prop_opportunities,
            'overall_confidence': max(moneyline_confidence, spread_confidence, total_confidence),
            'parlay_eligible': max(moneyline_confidence, spread_confidence, total_confidence) >= self.parlay_confidence_threshold
        }
    
    def _analyze_matchup(self, game_data: Dict) -> float:
        home_off_rating = game_data.get('home_offensive_rating', 110)
        away_def_rating = game_data.get('away_defensive_rating', 110)
        matchup_advantage = (home_off_rating - away_def_rating) / 10
        return min(max(matchup_advantage + 2.5, 1.0), 5.0)
    
    def _analyze_recent_form(self, game_data: Dict) -> float:
        home_last_5 = game_data.get('home_last_5_record', '3-2')
        away_last_5 = game_data.get('away_last_5_record', '2-3')
        home_wins = int(home_last_5.split('-')[0])
        away_wins = int(away_last_5.split('-')[0])
        form_differential = (home_wins - away_wins) / 2
        return min(max(form_differential + 3.0, 1.0), 5.0)
    
    def _analyze_rest_advantage(self, game_data: Dict) -> float:
        home_rest = game_data.get('home_rest_days', 1)
        away_rest = game_data.get('away_rest_days', 1)
        if away_rest == 0:
            return 4.5
        elif home_rest == 0:
            return 1.5
        rest_diff = (home_rest - away_rest) * 0.5
        return min(max(rest_diff + 3.0, 1.0), 5.0)
    
    def _analyze_injury_impact(self, game_data: Dict) -> float:
        home_injuries = game_data.get('home_key_injuries', [])
        away_injuries = game_data.get('away_key_injuries', [])
        injury_differential = len(away_injuries) - len(home_injuries)
        return min(max(injury_differential * 0.7 + 3.0, 1.0), 5.0)
    
    def _analyze_pace_totals(self, game_data: Dict) -> float:
        home_pace = game_data.get('home_pace', 100)
        away_pace = game_data.get('away_pace', 100)
        combined_pace = (home_pace + away_pace) / 2
        if combined_pace > 102:
            return 4.2
        elif combined_pace < 98:
            return 2.0
        else:
            return 3.0
    
    def _analyze_home_court(self, game_data: Dict) -> float:
        home_record = game_data.get('home_home_record', '15-10')
        home_wins = int(home_record.split('-')[0])
        home_games = sum(int(x) for x in home_record.split('-'))
        home_win_pct = home_wins / home_games if home_games > 0 else 0.5
        return min(max(home_win_pct * 5, 1.0), 5.0)
    
    def _analyze_line_value(self, game_data: Dict) -> float:
        expected_margin = game_data.get('power_rating_diff', 0)
        actual_spread = game_data.get('spread', 0)
        value_gap = abs(expected_margin - actual_spread)
        if value_gap > 3:
            return 4.5
        elif value_gap > 2:
            return 3.8
        else:
            return 2.5
    
    def _analyze_public_betting(self, game_data: Dict) -> float:
        public_pct = game_data.get('public_betting_pct', 50)
        if public_pct > 75:
            return 4.0
        elif public_pct < 30:
            return 4.0
        else:
            return 2.5
    
    def _calculate_moneyline_confidence(self, matchup, form, rest, injury, home_court, value) -> float:
        weights = {
            'matchup': 0.25,
            'form': 0.20,
            'rest': 0.15,
            'injury': 0.20,
            'home_court': 0.10,
            'value': 0.10
        }
        score = (
            matchup * weights['matchup'] +
            form * weights['form'] +
            rest * weights['rest'] +
            injury * weights['injury'] +
            home_court * weights['home_court'] +
            value * weights['value']
        )
        return score
    
    def _calculate_spread_confidence(self, matchup, form, rest, injury, home_court, public_fade) -> float:
        weights = {
            'matchup': 0.20,
            'form': 0.25,
            'rest': 0.15,
            'injury': 0.20,
            'home_court': 0.10,
            'public_fade': 0.10
        }
        score = (
            matchup * weights['matchup'] +
            form * weights['form'] +
            rest * weights['rest'] +
            injury * weights['injury'] +
            home_court * weights['home_court'] +
            public_fade * weights['public_fade']
        )
        return score
    
    def _calculate_total_confidence(self, pace, matchup, form) -> float:
        weights = {
            'pace': 0.50,
            'matchup': 0.30,
            'form': 0.20
        }
        score = (
            pace * weights['pace'] +
            matchup * weights['matchup'] +
            form * weights['form']
        )
        return score
    
    def _determine_best_bet(self, ml_conf, spread_conf, total_conf, game_data) -> Dict:
        confidences = {
            'moneyline': ml_conf,
            'spread': spread_conf,
            'total': total_conf
        }
        best_type = max(confidences, key=confidences.get)
        best_confidence = confidences[best_type]
        
        if best_type == 'moneyline':
            pick_detail = f"{game_data['home_team']} ML" if ml_conf > 2.5 else f"{game_data['away_team']} ML"
        elif best_type == 'spread':
            pick_detail = f"{game_data['home_team']} {game_data.get('spread', 'N/A')}"
        else:
            pick_detail = f"{'Over' if total_conf > 3.0 else 'Under'} {game_data.get('total_line', 'N/A')}"
        
        return {
            'type': best_type,
            'pick': pick_detail,
            'confidence': round(best_confidence, 1),
            'stars': self._confidence_to_stars(best_confidence)
        }
    
    def _confidence_to_stars(self, confidence: float) -> str:
        if confidence >= 4.5:
            return "⭐⭐⭐⭐⭐"
        elif confidence >= 4.0:
            return "⭐⭐⭐⭐"
        elif confidence >= 3.5:
            return "⭐⭐⭐"
        elif confidence >= 3.0:
            return "⭐⭐"
        else:
            return "⭐"
    
    def _find_prop_outliers(self, game_data: Dict) -> List[Dict]:
        props = []
        if game_data.get('has_prop_outliers', False):
            props.append({
                'player': game_data.get('prop_player', 'Player Name'),
                'prop_type': 'Points Over',
                'line': 25.5,
                'confidence': 4.2,
                'reasoning': 'Favorable matchup vs weak perimeter defense'
            })
        return props
    
    def _generate_reasoning(self, bet_type: str, confidence: float, game_data: Dict) -> str:
        reasons = []
        if confidence >= 4.0:
            reasons.append("🔥 High confidence play")
        if bet_type == 'moneyline':
            if game_data.get('home_rest_days', 1) > 2:
                reasons.append("Home team well-rested")
            if len(game_data.get('away_key_injuries', [])) > 0:
                reasons.append("Key away injuries")
        elif bet_type == 'spread':
            if game_data.get('public_betting_pct', 50) > 70:
                reasons.append("Fading heavy public action")
            home_ats = game_data.get('home_ats_record', '12-8')
            reasons.append(f"Home ATS: {home_ats}")
        elif bet_type == 'total':
            pace = (game_data.get('home_pace', 100) + game_data.get('away_pace', 100)) / 2
            if pace > 102:
                reasons.append(f"High combined pace ({pace:.1f})")
            else:
                reasons.append(f"Slow pace matchup ({pace:.1f})")
        return " | ".join(reasons) if reasons else "Solid value based on analytics"
    
    def generate_smart_parlays(self, all_picks: List[Dict]) -> List[Dict]:
        parlays = []
        eligible_picks = [
            pick for pick in all_picks 
            if pick['parlay_eligible'] and pick['overall_confidence'] >= self.parlay_confidence_threshold
        ]
        
        if len(eligible_picks) < 2:
            return parlays
        
        for i in range(len(eligible_picks)):
            for j in range(i + 1, len(eligible_picks)):
                pick1 = eligible_picks[i]
                pick2 = eligible_picks[j]
                combined_confidence = (pick1['overall_confidence'] + pick2['overall_confidence']) / 2
                parlays.append({
                    'legs': 2,
                    'picks': [pick1['best_bet']['pick'], pick2['best_bet']['pick']],
                    'games': [pick1['matchup'], pick2['matchup']],
                    'combined_confidence': round(combined_confidence, 1),
                    'estimated_odds': '+260',
                    'stars': self._confidence_to_stars(combined_confidence)
                })
        
        if len(eligible_picks) >= 3:
            top_3 = sorted(eligible_picks, key=lambda x: x['overall_confidence'], reverse=True)[:3]
            combined_confidence = sum(p['overall_confidence'] for p in top_3) / 3
            parlays.append({
                'legs': 3,
                'picks': [p['best_bet']['pick'] for p in top_3],
                'games': [p['matchup'] for p in top_3],
                'combined_confidence': round(combined_confidence, 1),
                'estimated_odds': '+600',
                'stars': self._confidence_to_stars(combined_confidence)
            })
        
        parlays.sort(key=lambda x: x['combined_confidence'], reverse=True)
        return parlays[:3]
