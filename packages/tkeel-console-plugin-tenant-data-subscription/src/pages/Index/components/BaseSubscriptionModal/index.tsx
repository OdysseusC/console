import { Box, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';

import { FormField, Modal } from '@tkeel/console-components';

const { TextField, TextareaField } = FormField;

export interface FormFields {
  username?: {
    disabled?: boolean;
  };

  nick_name?: {
    disabled?: boolean;
  };
}

export interface FormValues {
  title: string;
  description: string;
}

type Props = {
  title: ReactNode;
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  formFields?: FormFields;
  defaultValues?: FormValues;
  onClose: () => unknown;
  onConfirm: (formValues: FormValues) => unknown;
};

export default function BaseSubscriptionModal({
  title,
  isOpen,
  isConfirmButtonLoading,
  formFields,
  defaultValues,
  onClose,
  onConfirm,
}: Props) {
  // if (defaultValues) {
  //   console.log('defaultValues', defaultValues);
  // }

  const {
    register,
    formState: { errors },
    trigger,
    getValues,
    reset,
  } = useForm<FormValues>({ defaultValues });

  const handleConfirm = async () => {
    const result = await trigger();
    if (result) {
      const formValues = getValues();
      onConfirm(formValues);
      reset();
    }
  };

  return (
    <Modal
      title={title}
      isOpen={isOpen}
      isConfirmButtonLoading={isConfirmButtonLoading}
      onClose={() => {
        reset();
        onClose();
      }}
      onConfirm={handleConfirm}
    >
      <Text
        background="blue.50"
        border="1px solid"
        borderColor="blue.300"
        borderRadius="4px"
        color="blue.300"
        pl="20px"
        fontSize="12px"
        mb="20px"
        mt="10px"
        lineHeight="32px"
      >
        请注意，订阅数据本地存储24小时
      </Text>
      <TextField
        id="title"
        label="订阅名称"
        isDisabled={formFields?.username?.disabled}
        error={errors.title}
        registerReturn={register('title', {
          required: { value: true, message: 'required' },
        })}
      />
      <Box>
        <Text color="var(--chakra-colors-gray-600)" fontSize="14px" mb="4px">
          描述
        </Text>
        <TextareaField
          id="description"
          error={errors.description}
          registerReturn={register('description', {
            required: { value: false, message: '用户名称' },
          })}
        />
      </Box>
    </Modal>
  );
}
