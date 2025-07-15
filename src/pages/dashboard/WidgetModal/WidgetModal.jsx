import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, Stack
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const groupModes = ['grouped', 'stacked'];
const layouts = ['vertical', 'horizontal'];

function WidgetModal({ open, onClose, onCreate, initialType }) {
  const getInitialValues = (type) => {
    switch (type) {
      case 'BarChart':
        return  {title: '', groupMode: 'grouped', layout: 'vertical' };
      case 'LineChart':
        return { title: '' };
      case 'PieChart':
        return { title: '' };
      case 'GaugeChart':
        return { title: '', maxValue: '' };
      default:
        return { title: '' };
    }
  };

  const getValidationSchema = (type) => {
    switch (type) {
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
        });
      case 'GaugeChart':
        return Yup.object({
          title: Yup.string().required('Required field'),
          maxValue: Yup.number().required('Required field').positive('Must be positive'),
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
      onCreate({ type: initialType, config: values });
    }
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Настройки {initialType}</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Title"
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
                  label="Group mode"
                  name="groupMode"
                  value={formik.values.groupMode}
                  onChange={formik.handleChange}
                  error={formik.touched.groupMode && !!formik.errors.groupMode}
                  helperText={formik.touched.groupMode && formik.errors.groupMode}
                  fullWidth
                >
                  {groupModes.map(mode => (
                    <MenuItem key={mode} value={mode}>{mode}</MenuItem>
                  ))}
                </TextField>

                <TextField
                  select
                  label="Layout orientation"
                  name="layout"
                  value={formik.values.layout}
                  onChange={formik.handleChange}
                  error={formik.touched.layout && !!formik.errors.layout}
                  helperText={formik.touched.layout && formik.errors.layout}
                  fullWidth
                >
                  {layouts.map(layout => (
                    <MenuItem key={layout} value={layout}>{layout}</MenuItem>
                  ))}
                </TextField>
              </>
            )}

            {initialType === 'GaugeChart' && (
              <TextField
                label="Max Value"
                name="maxValue"
                type="number"
                value={formik.values.maxValue}
                onChange={formik.handleChange}
                error={formik.touched.maxValue && !!formik.errors.maxValue}
                helperText={formik.touched.maxValue && formik.errors.maxValue}
                fullWidth
              />
            )}
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Отмена</Button>
          <Button type="submit" variant="contained">Сохранить</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default WidgetModal;
