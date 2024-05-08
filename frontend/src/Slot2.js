/**
 *
 * @returns this function returns how much was won after spinning lot two
 */
function RunSlot2() {
  const Slots = [0, 0];
  let symbols = slot(slots);
  let reward = Winner2(symbols);
  return reward;
}
