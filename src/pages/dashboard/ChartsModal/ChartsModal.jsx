import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, Stack, FormControlLabel, Checkbox
} from '@mui/material';
import {useFormik} from 'formik';
import * as Yup from 'yup';

const groupModes = ['grouped', 'stacked'];
const layouts = ['vertical', 'horizontal'];
const boldness = [400, 500, 600, 700, 800];

function ChartsModal({open, onClose, onCreate, initialType}) {
  const getInitialValues = (type) => {
    switch (type) {
      case 'BarChart':
        return {
          title: '',
          groupMode: 'grouped',
          layout: 'vertical',
          enableLabel: true,
          enableTotals: false,
          enableGridX: false,
          enableGridY: true,
          isInteractive: true,
        };
      case 'LineChart':
        return {
          title: '',
          lineWidth: 2,
          enableArea: false,
          areaOpacity: 0.2,
          enablePoints: true,
          pointSize: 6,
          enablePointLabel: false,
          pointLabel: 'yFormatted',
          pointLabelYOffset: -12,
          enableGridX: true,
          enableGridY: true,
          isInteractive: true,
          enableCrosshair: true,
        };
      case 'PieChart':
        return {
          title: '',
          innerRadius: 0.5,
          padAngle: 0,
          sortByValue: false,
          enableArcLabels: true,
          enableArcLinkLabels: true,
          isInteractive: true,
          animate: true
        };
      case 'GaugeChart':
        return {
          title: '',
          levels: 20,
          percents: 0.86,
          arcWidth: 0.3,
          cornerRadius: 3,
          animate: true
        };
      case 'TextChart':
        return {
          title: '',
          text: '',
          fontSize: 16,
          fontWeight: 600,
          color: '#ffffff'
        };
      default:
        return {title: ''};
    }
  };

  const getValidationSchema = (type) => {
    switch (type) {
      case 'TextChart':
        return Yup.object({
          title: Yup.string().required('Required field'),
          text: Yup.string().required('Required field'),
          fontSize: Yup.number().required('Required field').min(8, 'Минимум 8').max(72, 'Максимум 72'),
          color: Yup.string().required('Required field'),
          fontWeight: Yup.number().oneOf(boldness, 'Недопустимое значение').required('Required field'),
        });
      case 'BarChart':
        return Yup.object({
          title: Yup.string().required('Required field'),
          groupMode: Yup.string().required('Required field'),
          layout: Yup.string().required('Required field'),
          enableLabel: Yup.boolean().required('Required field'),
          enableTotals: Yup.boolean().required('Required field'),
          enableGridX: Yup.boolean().required('Required field'),
          enableGridY: Yup.boolean().required('Required field'),
          isInteractive: Yup.boolean().required('Required field'),
        });
      case 'LineChart':
        return Yup.object({
          title: Yup.string().required('Required field'),
          lineWidth: Yup.number().required('Required field').min(1).max(20),
          enableArea: Yup.boolean().required('Required field'),
          areaOpacity: Yup.number().required('Required field').min(0).max(1),
          enablePoints: Yup.boolean().required('Required field'),
          pointSize: Yup.number().required('Required field').min(2).max(20),
          enablePointLabel: Yup.boolean().required('Required field'),
          pointLabel: Yup.string().oneOf(['data.xFormatted', 'data.yFormatted'], 'Должно быть "X" или "Y"'),
          pointLabelYOffset: Yup.number().required('Required field').min(-12).max(24),
          enableGridX: Yup.boolean().required('Required field'),
          enableGridY: Yup.boolean().required('Required field'),
          isInteractive: Yup.boolean().required('Required field'),
          enableCrosshair: Yup.boolean().required('Required field'),
        });
      case 'PieChart':
        return Yup.object({
          title: Yup.string().required('Required field'),
          innerRadius: Yup.number().min(0).max(1).required('Required field'),
          padAngle: Yup.number().min(0).max(45).required('Required field'),
          sortByValue: Yup.boolean().required('Required field'),
          enableArcLabels: Yup.boolean().required('Required field'),
          enableArcLinkLabels: Yup.boolean().required('Required field'),
          isInteractive: Yup.boolean().required('Required field'),
          animate: Yup.boolean().required('Required field'),
        });
      case 'GaugeChart':
        return Yup.object({
          title: Yup.string().required('Required field'),
          levels: Yup.number()
            .required('Required field')
            .positive('Must be positive')
            .integer('Must be an integer'),
          percents: Yup.number()
            .required('Required field')
            .min(0, 'Must be at least 0')
            .max(1, 'Must be at most 1'),
          arcWidth: Yup.number()
            .required('Required field')
            .min(0, 'Must be at least 0')
            .max(1, 'Must be at most 1'),
          cornerRadius: Yup.number()
            .required('Required field')
            .min(0, 'Must be at least 0'),
          animate: Yup.boolean().required('Required field'),
        });
      default:
        return Yup.object({
          title: Yup.string().required('Required field'),
        });
    }
  };

  const formik = useFormik({
    initialValues: getInitialValues(initialType),
    validationSchema: getValidationSchema(initialType),
    enableReinitialize: true,
    onSubmit: (values) => {
      onCreate({type: initialType, config: values});
    }
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Настройки {initialType}</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Stack
            spacing={2}
            sx={{mt: 1}}
          >
            <TextField
              label="Название"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && !!formik.errors.title}
              helperText={formik.touched.title && formik.errors.title}
              fullWidth
            />

            {(initialType === 'BarChart') && (
              <>
                <TextField
                  select
                  label="Группировка"
                  name="groupMode"
                  value={formik.values.groupMode}
                  onChange={formik.handleChange}
                  error={formik.touched.groupMode && !!formik.errors.groupMode}
                  helperText={formik.touched.groupMode && formik.errors.groupMode}
                  fullWidth
                >
                  {groupModes.map(mode => (
                    <MenuItem
                      key={mode}
                      value={mode}
                    >{mode}</MenuItem>
                  ))}
                </TextField>

                <TextField
                  select
                  label="Ориентация"
                  name="layout"
                  value={formik.values.layout}
                  onChange={formik.handleChange}
                  error={formik.touched.layout && !!formik.errors.layout}
                  helperText={formik.touched.layout && formik.errors.layout}
                  fullWidth
                >
                  {layouts.map(layout => (
                    <MenuItem
                      key={layout}
                      value={layout}
                    >{layout}</MenuItem>
                  ))}
                </TextField>

                <FormControlLabel
                  control={
                    <Checkbox
                      name="enableLabel"
                      checked={formik.values.enableLabel}
                      onChange={formik.handleChange}
                    />
                  }
                  label="Показывать подписи над столбцами"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="enableTotals"
                      checked={formik.values.enableTotals}
                      onChange={formik.handleChange}
                    />
                  }
                  label="Показывать суммы над группами"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="enableGridX"
                      checked={formik.values.enableGridX}
                      onChange={formik.handleChange}
                    />
                  }
                  label="Сетка по X"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="enableGridY"
                      checked={formik.values.enableGridY}
                      onChange={formik.handleChange}
                    />
                  }
                  label="Сетка по Y"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="isInteractive"
                      checked={formik.values.isInteractive}
                      onChange={formik.handleChange}
                    />
                  }
                  label="Интерактивность"
                />
              </>
            )}

            {initialType === 'LineChart' && (
              <>
                <TextField
                  label="Толщина линии"
                  name="lineWidth"
                  type="number"
                  value={formik.values.lineWidth}
                  onChange={formik.handleChange}
                  error={formik.touched.lineWidth && !!formik.errors.lineWidth}
                  helperText={formik.touched.lineWidth && formik.errors.lineWidth}
                  fullWidth
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="enableArea"
                      checked={formik.values.enableArea}
                      onChange={formik.handleChange}
                    />
                  }
                  label="Заполнить область под линией"
                />
                <TextField
                  label="Прозрачность области"
                  name="areaOpacity"
                  type="number"
                  value={formik.values.areaOpacity}
                  onChange={formik.handleChange}
                  error={formik.touched.areaOpacity && !!formik.errors.areaOpacity}
                  helperText={formik.touched.areaOpacity && formik.errors.areaOpacity}
                  fullWidth
                  inputProps={{min: 0, max: 1, step: 0.1}}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="enablePoints"
                      checked={formik.values.enablePoints}
                      onChange={formik.handleChange}
                    />
                  }
                  label="Показывать точки"
                />
                <TextField
                  label="Размер точки"
                  name="pointSize"
                  type="number"
                  value={formik.values.pointSize}
                  onChange={formik.handleChange}
                  error={formik.touched.pointSize && !!formik.errors.pointSize}
                  helperText={formik.touched.pointSize && formik.errors.pointSize}
                  fullWidth
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="enablePointLabel"
                      checked={formik.values.enablePointLabel}
                      onChange={formik.handleChange}
                    />
                  }
                  label="Подписи точек"
                />
                <TextField
                  select
                  label="Ось подписи точки"
                  name="pointLabel"
                  value={formik.values.pointLabel}
                  onChange={formik.handleChange}
                  error={formik.touched.pointLabel && !!formik.errors.pointLabel}
                  helperText={formik.touched.pointLabel && formik.errors.pointLabel}
                  fullWidth
                >
                  <MenuItem value="data.xFormatted">X</MenuItem>
                  <MenuItem value="data.yFormatted">Y</MenuItem>
                </TextField>
                <TextField
                  label="Смещение подписи по Y"
                  name="pointLabelYOffset"
                  type="number"
                  value={formik.values.pointLabelYOffset}
                  onChange={formik.handleChange}
                  error={formik.touched.pointLabelYOffset && !!formik.errors.pointLabelYOffset}
                  helperText={formik.touched.pointLabelYOffset && formik.errors.pointLabelYOffset}
                  fullWidth
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="enableGridX"
                      checked={formik.values.enableGridX}
                      onChange={formik.handleChange}
                    />
                  }
                  label="Сетка по X"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="enableGridY"
                      checked={formik.values.enableGridY}
                      onChange={formik.handleChange}
                    />
                  }
                  label="Сетка по Y"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="isInteractive"
                      checked={formik.values.isInteractive}
                      onChange={formik.handleChange}
                    />
                  }
                  label="Интерактивность"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="enableCrosshair"
                      checked={formik.values.enableCrosshair}
                      onChange={formik.handleChange}
                    />
                  }
                  label="Курсор по оси"
                />
              </>
            )}

            {initialType === 'TextChart' && (
              <>
                <TextField
                  label="Текст"
                  name="text"
                  value={formik.values.text}
                  onChange={formik.handleChange}
                  error={formik.touched.text && !!formik.errors.text}
                  helperText={formik.touched.text && formik.errors.text}
                  fullWidth
                  multiline
                  rows={3}
                />
                <TextField
                  label="Размер шрифта"
                  name="fontSize"
                  type="number"
                  value={formik.values.fontSize}
                  onChange={formik.handleChange}
                  error={formik.touched.fontSize && !!formik.errors.fontSize}
                  helperText={formik.touched.fontSize && formik.errors.fontSize}
                  fullWidth
                  inputProps={{min: 8, max: 72}}
                />
                <TextField
                  label="Цвет"
                  name="color"
                  type="color"
                  value={formik.values.color}
                  onChange={formik.handleChange}
                  error={formik.touched.color && !!formik.errors.color}
                  helperText={formik.touched.color && formik.errors.color}
                  fullWidth
                  sx={{width: '100px'}}
                />
                <TextField
                  select
                  label="Жирность"
                  name="fontWeight"
                  value={formik.values.fontWeight}
                  onChange={formik.handleChange}
                  error={formik.touched.fontWeight && !!formik.errors.fontWeight}
                  helperText={formik.touched.fontWeight && formik.errors.fontWeight}
                  fullWidth
                >
                  {boldness.map(weight => (
                    <MenuItem
                      key={weight}
                      value={weight}
                    >{weight}</MenuItem>
                  ))}
                </TextField>
              </>
            )}

            {initialType === 'PieChart' && (
              <>
                <TextField
                  label="Внутренний радиус"
                  name="innerRadius"
                  type="number"
                  value={formik.values.innerRadius}
                  onChange={formik.handleChange}
                  error={formik.touched.innerRadius && !!formik.errors.innerRadius}
                  helperText={formik.touched.innerRadius && formik.errors.innerRadius}
                  fullWidth
                  inputProps={{min: 0, max: 1, step: 0.01}}
                />
                <TextField
                  label="Отступ между секторами"
                  name="padAngle"
                  type="number"
                  value={formik.values.padAngle}
                  onChange={formik.handleChange}
                  error={formik.touched.padAngle && !!formik.errors.padAngle}
                  helperText={formik.touched.padAngle && formik.errors.padAngle}
                  fullWidth
                  inputProps={{min: 0, max: 45, step: 1}}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="sortByValue"
                      checked={formik.values.sortByValue}
                      onChange={formik.handleChange}
                    />
                  }
                  label="Сортировать по значению"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="enableArcLabels"
                      checked={formik.values.enableArcLabels}
                      onChange={formik.handleChange}
                    />
                  }
                  label="Показывать подписи дуг"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="enableArcLinkLabels"
                      checked={formik.values.enableArcLinkLabels}
                      onChange={formik.handleChange}
                    />
                  }
                  label="Показывать подписи с линиями"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="isInteractive"
                      checked={formik.values.isInteractive}
                      onChange={formik.handleChange}
                    />
                  }
                  label="Интерактивность"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="animate"
                      checked={formik.values.animate}
                      onChange={formik.handleChange}
                    />
                  }
                  label="Анимация"
                />
              </>
            )}

            {initialType === 'GaugeChart' && (
              <>
                <TextField
                  label="Проценты"
                  name="percents"
                  type="number"
                  value={formik.values.percents}
                  onChange={formik.handleChange}
                  error={formik.touched.percents && !!formik.errors.percents}
                  helperText={formik.touched.percents && formik.errors.percents}
                  fullWidth
                  inputProps={{min: 0, max: 1, step: 0.01}}
                />
                <TextField
                  label="Количество уровней"
                  name="levels"
                  type="number"
                  value={formik.values.levels}
                  onChange={formik.handleChange}
                  error={formik.touched.levels && !!formik.errors.levels}
                  helperText={formik.touched.levels && formik.errors.levels}
                  fullWidth
                />
                <TextField
                  label="Ширина части круга"
                  name="arcWidth"
                  type="number"
                  value={formik.values.arcWidth}
                  onChange={formik.handleChange}
                  error={formik.touched.arcWidth && !!formik.errors.arcWidth}
                  helperText={formik.touched.arcWidth && formik.errors.arcWidth}
                  fullWidth
                  inputProps={{min: 0, max: 1, step: 0.01}}
                />
                <TextField
                  label="Радиус углов части круга"
                  name="cornerRadius"
                  type="number"
                  value={formik.values.cornerRadius}
                  onChange={formik.handleChange}
                  error={formik.touched.cornerRadius && !!formik.errors.cornerRadius}
                  helperText={formik.touched.cornerRadius && formik.errors.cornerRadius}
                  fullWidth
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="animate"
                      checked={formik.values.animate}
                      onChange={formik.handleChange}
                    />
                  }
                  label="Анимация"
                />
              </>
            )}
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Отмена</Button>
          <Button
            type="submit"
            variant="contained"
          >Сохранить</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ChartsModal;
