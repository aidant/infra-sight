export default function (id) {

  let NAMES = {
    '0x02E00000FFFFFFFF': 'all',
    '0x02E0000000000002': 'reaper',
    '0x02E0000000000003': 'tracer',
    '0x02E0000000000004': 'mercy',
    '0x02E0000000000005': 'hanzo',
    '0x02E0000000000006': 'torbjorn',
    '0x02E0000000000007': 'reinhardt',
    '0x02E0000000000008': 'pharah',
    '0x02E0000000000009': 'winston',
    '0x02E000000000000A': 'widowmaker',
    '0x02E0000000000015': 'bastion',
    '0x02E0000000000016': 'symmetra',
    '0x02E0000000000020': 'zenyatta',
    '0x02E0000000000029': 'genji',
    '0x02E0000000000040': 'roadhog',
    '0x02E0000000000042': 'mccree',
    '0x02E0000000000065': 'junkrat',
    '0x02E0000000000068': 'zarya',
    '0x02E000000000006E': 'soldier76',
    '0x02E0000000000079': 'lucio',
    '0x02E000000000007A': 'dva',
    '0x02E00000000000DD': 'mei',
    '0x02E000000000012E': 'sombra',
    '0x02E000000000013B': 'ana',
    '0x02E000000000013E': 'orisa',
    'overwatch.guid.0x0860000000000021': 'time_played_seconds',
    'overwatch.guid.0x0860000000000039': 'games_won',
    'overwatch.guid.0x086000000000002F': 'weapon_accuracy',
    'overwatch.guid.0x08600000000003D2': 'eliminations_per_life',
    'overwatch.guid.0x0860000000000346': 'multikill_best',
    'overwatch.guid.0x086000000000039C': 'objective_kills_average',
    'overwatch.guid.0x08600000000003D1': 'win_percentage'
  };

  return NAMES[id] || undefined
};
