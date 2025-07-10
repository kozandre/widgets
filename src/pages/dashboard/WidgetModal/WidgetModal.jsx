import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, MenuItem, TextField, Stack
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const chartTypes = ['BarChart', 'LineChart', 'PieChart', 'GaugeChart'];

const groupModes = ['grouped', 'stacked'];
const layouts = ['vertical', 'horizontal'];

export function WidgetModal({ open, onClose, onCreate }) {
  const formik = useFormik({
    initialValues: {
      type: '',
      groupMode: '',
      layout: '',
      title: ''
    },
    validationSchema: Yup.object({
      type: Yup.string().required('Required field'),
      groupMode: Yup.string().required('Required field'),
      layout: Yup.string().required('Required field'),
      title: Yup.string().required('Required field')
    }),
    onSubmit: (values) => {
      onCreate({ type: values.type, config: values });
    }
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create widget</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="Title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && !!formik.errors.title}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              select
              label="Graphic type"
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              error={formik.touched.type && !!formik.errors.type}
              helperText={formik.touched.type && formik.errors.type}
            >
              {chartTypes.map((type) => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Group mode"
              name="groupMode"
              value={formik.values.groupMode}
              onChange={formik.handleChange}
              error={formik.touched.groupMode && !!formik.errors.groupMode}
              helperText={formik.touched.groupMode && formik.errors.groupMode}
            >
              {groupModes.map((mode) => (
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
            >
              {layouts.map((layout) => (
                <MenuItem key={layout} value={layout}>{layout}</MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
          <Button type="submit" variant="contained">Create</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
