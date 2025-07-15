import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, Stack, FormControlLabel, Checkbox
} from '@mui/material';
import {useFormik} from 'formik';
import * as Yup from 'yup';

const groupModes = ['grouped', 'stacked'];
const layouts = ['vertical', 'horizontal'];
const boldness = [400, 500, 600, 700, 800];

function WidgetModal({open, onClose, onCreate, initialType}) {
  const getInitialValues = (type) => {
    switch (type) {
      case 'BarChart':
        return {title: '', groupMode: 'grouped', layout: 'vertical'};
      case 'LineChart':
        return {title: ''};
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
        });
      case 'LineChart':
        return Yup.object({
          title: Yup.string().required('Required field'),
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
                  inputProps={{ min: 0, max: 1, step: 0.01 }}
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
                  inputProps={{ min: 0, max: 45, step: 1 }}
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
                  inputProps={{ min: 0, max: 1, step: 0.01 }}
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
                  inputProps={{ min: 0, max: 1, step: 0.01 }}
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

export default WidgetModal;
