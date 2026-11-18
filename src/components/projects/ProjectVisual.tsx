import type { VisualKind } from '../../data/projects'
import { CareerVisual } from './visuals/CareerVisual'
import { CnnVisual } from './visuals/CnnVisual'
import { DonationVisual } from './visuals/DonationVisual'
import { HousingVisual } from './visuals/HousingVisual'

export function ProjectVisual({ kind }: { kind: VisualKind }) {
  switch (kind) {
    case 'career':
      return <CareerVisual />
    case 'housing':
      return <HousingVisual />
    case 'donation':
      return <DonationVisual />
    case 'cnn':
      return <CnnVisual />
  }
}
