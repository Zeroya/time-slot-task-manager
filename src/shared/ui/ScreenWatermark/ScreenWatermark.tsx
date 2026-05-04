import {
  WatermarkLine,
  WatermarkRoot,
} from '@/shared/ui/ScreenWatermark/ScreenWatermark.styles'

/**
 * Full-screen semi-transparent text; does not block clicks (pointer-events: none).
 */
export function ScreenWatermark() {
  return (
    <WatermarkRoot aria-hidden>
      <WatermarkLine component="span" variant="inherit">
        прости, Соня
      </WatermarkLine>
      <WatermarkLine
        component="span"
        variant="inherit"
        sx={{ fontSize: 'clamp(2rem, 9vw, 6.5rem)', opacity: 0.85 }}
      >
        целую
      </WatermarkLine>
    </WatermarkRoot>
  )
}
