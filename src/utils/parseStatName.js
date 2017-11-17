export default function (inp) {
  let name = inp
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '_')
    .match(/^(.+?)?(?:_+-_+(.+))?$/)

  let suffix = name[2]
  let prefix = name[1]
    .replace(/(assist|blow|card|death|hit|kill|medal|elimination)s?$/, '$1s')
    .replace('shots_hits', 'shots_hit')
    .replace('rip-tire', 'riptire')
    .replace('teleporter_pad_destroyed', 'teleporter_pads_destroyed')
    .replace('shield_generator_destroyed', 'shield_generators_destroyed')
    .replace('pulse_bomb_attached', 'pulse_bombs_attached')
    .replace('self-destruct', 'self_destruct')
    .replace('elimination_', 'eliminations_')
    .replace('ultimate_', 'ultimates_')
    .replace('_ultimates_', 'ultimate_')
    .replace('multikills_best', 'multikill_best')
    .replace('turret_destroyed', 'turrets_destroyed')
    .replace('&#xf6', 'o')
    .replace('&apos', '')

  if (suffix) {
    return `${prefix}_${suffix}`
  } else {
    return prefix
  }
}
