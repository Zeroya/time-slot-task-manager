import {
  WatermarkLine,
  WatermarkLineSmall,
  WatermarkRoot,
} from '@/shared/ui/ScreenWatermark/ScreenWatermark.styles'

/**
 * Full-screen semi-transparent text; does not block clicks (pointer-events: none).
 */
export function ScreenWatermark() {
  return (
    <WatermarkRoot aria-hidden>
      <WatermarkLine>прости, Соня</WatermarkLine>
      <WatermarkLineSmall>целую</WatermarkLineSmall>
    </WatermarkRoot>
  )
}
