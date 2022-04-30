import SpeedSvg from '../assets/speed.svg';
import AccelerationSvg from '../assets/acceleration.svg';
import ForceSvg from '../assets/force.svg';
import GasolineSvg from '../assets/gasoline.svg';
import ExchangeSvg from '../assets/exchange.svg';
import EnergySvg from '../assets/energy.svg';
import HybridSvg from '../assets/hybrid.svg';
import CarSvg from '../assets/car.svg';
import PeopleSvg from '../assets/people.svg';

export function getAccessoryIcon(type: string) {
  const iconEnum = {
    speed: SpeedSvg,
    acceleration: AccelerationSvg,
    turning_diameter: ForceSvg,
    electric_motor: EnergySvg,
    exchange: ExchangeSvg,
    seats: PeopleSvg,
    gasoline_motor: GasolineSvg,
    hybrid_motor: HybridSvg,
    default: CarSvg
  };

  return iconEnum[type] || iconEnum['default'];
}
