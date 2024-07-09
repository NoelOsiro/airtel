import * as React from 'react';
import { useFormik, type FormikHelpers } from 'formik';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { type FormValues } from '@/types/FormValue'; // Assuming FormValues is correctly imported
import { validationSchema } from '@/utils/helper/ValidationSchema';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import dayjs from 'dayjs';

interface CustomerFormProps {
    onSubmit: (values: FormValues) => void;
    close: () => void; // Function to close the modal
}

export function CustomerForm({ onSubmit, close }: CustomerFormProps): React.ReactElement {
    const formik = useFormik<FormValues>({
        initialValues: {
            name: '',
            phone_no: '',
            email: '',
            address: '',
            package: '3500', // Default package value, assuming it's a string
            subscription_date: dayjs().toDate(), // Default to current date
            expiry_date: dayjs().toDate(),
        },
        validationSchema,
        onSubmit: (values: FormValues, helpers: FormikHelpers<FormValues>) => {
            const subscription_date = dayjs(values.subscription_date);
            const expiry_date = subscription_date.add(30, 'day').toDate();
            const updatedValues = { ...values, expiry_date };
            onSubmit(updatedValues);
            helpers.setSubmitting(false);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={Boolean(formik.touched.name && formik.errors.name)}
                            helperText={formik.touched.name ? formik.errors.name : ''}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="phone_no"
                            name="phone_no"
                            label="Phone"
                            value={formik.values.phone_no}
                            onChange={formik.handleChange}
                            error={Boolean(formik.touched.phone_no && formik.errors.phone_no)}
                            helperText={formik.touched.phone_no ? formik.errors.phone_no : ''}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={Boolean(formik.touched.email && formik.errors.email)}
                            helperText={formik.touched.email ? formik.errors.email : ''}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="address"
                            name="address"
                            label="Address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            error={Boolean(formik.touched.address && formik.errors.address)}
                            helperText={formik.touched.address ? formik.errors.address : ''}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="subscription_date"
                            name="subscription_date"
                            label="Subscription Date"
                            type="date"
                            value={dayjs(formik.values.subscription_date).format('YYYY-MM-DD')}
                            onChange={formik.handleChange}
                            error={Boolean(formik.touched.subscription_date && formik.errors.subscription_date)}
                            helperText={formik.touched.subscription_date ? formik.errors.subscription_date : ''}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="expiry_date"
                            name="expiry_date"
                            label="Expiry Date"
                            value={dayjs(formik.values.expiry_date).format('YYYY-MM-DD')}
                            InputProps={{
                                readOnly: true,
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel id="package-label">Package</InputLabel>
                        <Select
                            fullWidth
                            labelId="package-label"
                            id="package"
                            name="package"
                            value={formik.values.package}
                            onChange={formik.handleChange}
                            error={Boolean(formik.touched.package && formik.errors.package)}
                        >
                            <MenuItem value="3500">3,500</MenuItem>
                            <MenuItem value="5500">5,500</MenuItem>
                            <MenuItem value="7500">7,500</MenuItem>
                        </Select>
                        {formik.touched.package && formik.errors.package ? <FormHelperText error>{formik.errors.package}</FormHelperText> : null}
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={close}>Cancel</Button>
                <Button type="submit" disabled={!formik.isValid || formik.isSubmitting}>
                    Select Router
                </Button>
            </DialogActions>
        </form>
    );
}
