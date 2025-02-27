import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import { useIsMutating } from 'react-query';

import {
  ChevronRightFilledIcon,
  DocumentPencilTowToneIcon,
} from '@tkeel/console-icons';

import useCreateTemplateMutation, {
  RequestData as FormValues,
} from '@/tkeel-console-plugin-tenant-device-templates/hooks/mutations/useCreateTemplateMutation';

import CustomTemplateModal from '../CustomTemplateModal';

type Props = {
  onSuccess: (id: string) => void;
};

export default function CustomTemplateButton({ onSuccess }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMutating = useIsMutating();
  const isLoading = isMutating > 0;

  const { mutate } = useCreateTemplateMutation({
    onSuccess(data) {
      onSuccess(data.data.templateObject.id);
      onClose();
    },
  });

  const handleConfirm = (formValues: FormValues) => {
    const { name, description } = formValues;
    if (formValues) {
      mutate({
        data: {
          name,
          description,
        },
      });
    }
    return null;
  };

  return (
    <Flex
      position="relative"
      minHeight="70px"
      cursor="pointer"
      alignItems="center"
      flexBasis="420px"
      p="0 20px 0 16px"
      border="1px"
      borderColor="grayAlternatives.50"
      borderRadius="4px"
      onClick={onOpen}
    >
      <Text
        position="absolute"
        top="0px"
        left="0px"
        w="64px"
        h="24px"
        lineHeight="24px"
        align="center"
        bg="primarySub"
        color="primary"
        fontSize="12px"
        fontWeight="600"
        borderRadius="10px 0 50px 0"
      >
        自定义
      </Text>
      <DocumentPencilTowToneIcon size="28px" />
      <Flex flexDirection="column" ml="16px" flexBasis="316px">
        <Text color="black" fontSize="14px" fontWeight="600">
          创建自定义模版
        </Text>
        <Text color="gray.500" isTruncated maxWidth="284px" fontSize="12px">
          模型说明一句话描述模型说明一句话描述模型
        </Text>
      </Flex>
      <ChevronRightFilledIcon size="24px" />
      <CustomTemplateModal
        title="创建自定义模板"
        isOpen={isOpen}
        onClose={onClose}
        isConfirmButtonLoading={isLoading}
        onConfirm={handleConfirm}
      />
    </Flex>
  );
}
