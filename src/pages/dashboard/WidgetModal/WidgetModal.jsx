import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  widgetTitle: Yup.string()
    .max(50, 'Максимум 50 символов')
    .required('Введите название виджета'),
});

const WidgetModal = ({ open, onClose, onSubmit, initialValues }) => {
  const defaultValues = {
    widgetTitle: '',
    showWidgetTitle: true,
    showChartTitle: true,
    ...initialValues,
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Настройка виджета</DialogTitle>

      <Formik
        initialValues={defaultValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          console.log('Submit values from WidgetModal:', values);
          onSubmit(values);
          actions.setSubmitting(false);
          onClose();
        }}
      >
        {({ values, handleChange, touched, errors, isSubmitting }) => (
          <Form>
            <DialogContent dividers>
              <TextField
                fullWidth
                label="Название виджета"
                name="widgetTitle"
                value={values.widgetTitle}
                onChange={handleChange}
                error={touched.widgetTitle && Boolean(errors.widgetTitle)}
                helperText={touched.widgetTitle && errors.widgetTitle}
                margin="normal"
              />

              <FormControlLabel
                control={
                  <Field
                    type="checkbox"
                    name="showWidgetTitle"
                    as={Checkbox}
                    checked={values.showWidgetTitle}
                  />
                }
                label="Показывать название виджета"
              />

              <FormControlLabel
                control={
                  <Field
                    type="checkbox"
                    name="showChartTitle"
                    as={Checkbox}
                    checked={values.showChartTitle}
                  />
                }
                label="Показывать название графика"
              />
            </DialogContent>

            <DialogActions>
              <Button onClick={onClose} color="secondary">
                Отмена
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Сохранить
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default WidgetModal;
