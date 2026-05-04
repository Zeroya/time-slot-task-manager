import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import TodayIcon from '@mui/icons-material/Today'
import ViewDayIcon from '@mui/icons-material/ViewDay'
import ViewWeekIcon from '@mui/icons-material/ViewWeek'
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import {
  goToToday,
  selectDayWindowBounds,
  setHideEmptySlots,
  setOnlyActiveSlots,
  setRangeFrom,
  setRangeTo,
  setSearchQuery,
  setSingleDate,
  setStatusMask,
  setViewMode,
  shiftDayWindowNext,
  shiftDayWindowPrev,
  type CalendarViewMode,
} from '@/features/task-calendar/model/calendarFiltersSlice'
import {
  FiltersPaper,
  FiltersRow,
  NavHint,
  WindowNavBox,
} from '@/features/task-calendar/ui/CalendarFiltersBar/CalendarFiltersBar.styles'
import {
  MAX_RANGE_SPAN_DAYS,
  MAX_VISIBLE_DAYS,
} from '@/shared/config/calendarConfig'

export function CalendarFiltersBar() {
  const dispatch = useAppDispatch()
  const f = useAppSelector((s) => s.calendarFilters)
  const bounds = useAppSelector((s) =>
    selectDayWindowBounds(s.calendarFilters),
  )

  const showWindowNav = bounds.totalDays > MAX_VISIBLE_DAYS
  const visibleEnd = Math.min(
    bounds.safeStart + MAX_VISIBLE_DAYS,
    bounds.totalDays,
  )

  const handleMode = (_: unknown, v: CalendarViewMode | null) => {
    if (v) dispatch(setViewMode(v))
  }

  return (
    <FiltersPaper elevation={0} variant="outlined">
      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5 }}>
        Filters & date range
      </Typography>

      <FiltersRow>
        <ToggleButtonGroup
          value={f.viewMode}
          exclusive
          onChange={handleMode}
          size="small"
          color="primary"
        >
          <ToggleButton value="single">
            <ViewDayIcon fontSize="small" sx={{ mr: 0.5 }} />
            Single day
          </ToggleButton>
          <ToggleButton value="range">
            <ViewWeekIcon fontSize="small" sx={{ mr: 0.5 }} />
            Period
          </ToggleButton>
        </ToggleButtonGroup>

        <Tooltip title="Jump to today (single day view)">
          <Button
            variant="outlined"
            size="small"
            startIcon={<TodayIcon />}
            onClick={() => dispatch(goToToday())}
          >
            Today
          </Button>
        </Tooltip>
      </FiltersRow>

      <FiltersRow>
        {f.viewMode === 'single' ? (
          <DatePicker
            label="Day"
            value={dayjs(f.singleDate)}
            onChange={(v) => {
              if (v) dispatch(setSingleDate(v.format('YYYY-MM-DD')))
            }}
            slots={{ openPickerIcon: CalendarMonthIcon }}
            slotProps={{ textField: { size: 'small', sx: { minWidth: 200 } } }}
          />
        ) : (
          <>
            <DatePicker
              label="From"
              value={dayjs(f.rangeFrom)}
              onChange={(v) => {
                if (v) dispatch(setRangeFrom(v.format('YYYY-MM-DD')))
              }}
              slots={{ openPickerIcon: CalendarMonthIcon }}
              slotProps={{ textField: { size: 'small', sx: { minWidth: 160 } } }}
            />
            <DatePicker
              label="To"
              value={dayjs(f.rangeTo)}
              minDate={dayjs(f.rangeFrom)}
              maxDate={dayjs(f.rangeFrom).add(MAX_RANGE_SPAN_DAYS - 1, 'day')}
              onChange={(v) => {
                if (v) dispatch(setRangeTo(v.format('YYYY-MM-DD')))
              }}
              slots={{ openPickerIcon: CalendarMonthIcon }}
              slotProps={{ textField: { size: 'small', sx: { minWidth: 160 } } }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ alignSelf: 'center' }}>
              Max {MAX_RANGE_SPAN_DAYS} days per period
            </Typography>
          </>
        )}
      </FiltersRow>

      {showWindowNav ? (
        <FiltersRow>
          <WindowNavBox>
            <Tooltip title="Earlier days in range">
              <span>
                <IconButton
                  size="small"
                  onClick={() => dispatch(shiftDayWindowPrev())}
                  disabled={bounds.safeStart <= 0}
                >
                  <ChevronLeftIcon />
                </IconButton>
              </span>
            </Tooltip>
            <NavHint>
              Days {bounds.safeStart + 1}–{visibleEnd} of {bounds.totalDays}{' '}
              (showing {MAX_VISIBLE_DAYS} at a time)
            </NavHint>
            <Tooltip title="Later days in range">
              <span>
                <IconButton
                  size="small"
                  onClick={() => dispatch(shiftDayWindowNext())}
                  disabled={bounds.safeStart >= bounds.maxStart}
                >
                  <ChevronRightIcon />
                </IconButton>
              </span>
            </Tooltip>
          </WindowNavBox>
        </FiltersRow>
      ) : null}

      <Divider sx={{ my: 1.5 }} />

      <FiltersRow>
        <TextField
          label="Search title"
          size="small"
          value={f.searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          sx={{ minWidth: 220, flex: '1 1 200px' }}
          placeholder="Filter by keyword…"
        />
      </FiltersRow>

      <FiltersRow>
        <FormGroup row sx={{ gap: 2, flexWrap: 'wrap' }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={f.hideEmptySlots}
                onChange={(e) =>
                  dispatch(setHideEmptySlots(e.target.checked))
                }
              />
            }
            label="Hide empty slots"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={f.onlyActiveSlots}
                onChange={(e) =>
                  dispatch(setOnlyActiveSlots(e.target.checked))
                }
              />
            }
            label="Only active sessions (in progress)"
          />
        </FormGroup>
      </FiltersRow>

      <FiltersRow>
        <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
          Status:
        </Typography>
        <FormGroup row sx={{ gap: 1, flexWrap: 'wrap' }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={f.statusMask.pending}
                onChange={(e) =>
                  dispatch(setStatusMask({ pending: e.target.checked }))
                }
              />
            }
            label="Pending"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={f.statusMask.active}
                onChange={(e) =>
                  dispatch(setStatusMask({ active: e.target.checked }))
                }
              />
            }
            label="Active"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={f.statusMask.done}
                onChange={(e) =>
                  dispatch(setStatusMask({ done: e.target.checked }))
                }
              />
            }
            label="Done"
          />
        </FormGroup>
      </FiltersRow>
    </FiltersPaper>
  )
}
