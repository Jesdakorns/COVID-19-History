import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {DefaultizedProps} from '@mui/x-date-pickers/DatePicker/shared';
import React from 'react';
import {Control, Controller, FieldPath, RegisterOptions} from 'react-hook-form';
import {Box, StandardTextFieldProps, TextField} from '@mui/material';
// import {MessengerTextField} from './view/MessengerTextField';

export declare type DefaultizedDatePickerProps = DefaultizedProps<any> & StandardTextFieldProps;

interface FormTextInputProps<FieldValue extends Record<string, any>>
  extends DefaultizedDatePickerProps {
  control?: Control<FieldValue> | undefined;
  name: FieldPath<FieldValue>;
  rules?: Exclude<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
  description?: string;
  startLabelIcon?: React.ReactNode;
  endLabelIcon?: React.ReactNode;
  showRequired?: boolean;
}

const DatePickerForm = <FieldValue extends Record<string, any>>({
  control,
  name,
  rules,
  placeholder = '',
  startLabelIcon,
  label,
  endLabelIcon,
  showRequired = true,
  ...props
}: FormTextInputProps<FieldValue>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {onChange, onBlur, value = null, ref}, fieldState: {error}}) => (
        <>
          <Box width={'100%'} mb={0.7}>
            <Box
              className="label"
              display={'flex'}
              flexDirection={'row'}
              alignItems={'center'}
              gap={0.5}
            >
              {startLabelIcon}
              {label}
              {showRequired && rules?.required && <Box color="red">*</Box>}
              {endLabelIcon}
            </Box>
          </Box>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              inputFormat="MM/yyyy"
              openTo="day"
              value={value || ''}
              onChange={onChange}
              disableMaskedInput
              renderInput={(params: any) => {
                const {inputProps, ...paramsInput} = params;
                return (
                  <TextField
                    fullWidth
                    inputProps={{
                      ...inputProps,
                      placeholder: `${placeholder}`,
                      readOnly: true,
                    }}
                    inputRef={ref}
                    onBlur={onBlur}
                    {...paramsInput}
                    error={!!error}
                  />
                );
              }}
              {...props}
            />
          </LocalizationProvider>
          {/* {error ? (
            <MessengerTextField mode="error" message={error.message || `This field is required`} />
          ) : (
            <MessengerTextField mode="description" message={description} />
          )} */}
        </>
      )}
    />
  );
};

export default DatePickerForm;
