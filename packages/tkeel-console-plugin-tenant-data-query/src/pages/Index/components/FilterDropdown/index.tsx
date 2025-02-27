import { Flex, StyleProps } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import useDeviceGroupQuery from '@/tkeel-console-plugin-tenant-data-query/hooks/queries/useDeviceGroupQuery';
import useDeviceListQuery from '@/tkeel-console-plugin-tenant-data-query/hooks/queries/useDeviceListQuery';
import useDeviceTemplatesQuery from '@/tkeel-console-plugin-tenant-data-query/hooks/queries/useDeviceTemplatesQuery';
import { FilterConditionIds } from '@/tkeel-console-plugin-tenant-data-query/pages/Index/constants';
import { RequestDataCondition } from '@/tkeel-console-plugin-tenant-data-query/types/request-data';

import { Status } from '../../../../components/StatusSelect';
import FilterConditionSelect from './FilterConditionSelect';
import ResultContent from './ResultContent';

const { DEVICE_GROUP_ID, DEVICE_TEMPLATES_ID, KEYWORDS } = FilterConditionIds;

type Condition = {
  id: string;
  label: string;
  value: string;
};

export interface HandleUpdateConditionProps {
  updateCondition?: { id: string; value: string };
  removeConditionId?: string;
}

type Props = {
  type: 'index' | 'searchResult';
  status: Status;
  showDeviceList: boolean;
  setStatus: (status: Status) => unknown;
  setDeviceGroupId: Dispatch<SetStateAction<string>>;
  setTemplateId: Dispatch<SetStateAction<string>>;
  style?: StyleProps;
  filterConditions: Condition[];
  handleConditionClick: (condition: { id: string; label: string }) => unknown;
  handleUpdateCondition: ({
    updateCondition,
    removeConditionId,
  }: HandleUpdateConditionProps) => unknown;
  setShowDeviceList: Dispatch<SetStateAction<boolean>>;
  hideFilterDropdown: () => unknown;
};

export default function FilterDropdown({
  type,
  status,
  showDeviceList,
  setStatus,
  setDeviceGroupId,
  setTemplateId,
  style,
  filterConditions,
  handleConditionClick,
  handleUpdateCondition,
  setShowDeviceList,
  hideFilterDropdown,
}: Props) {
  const [searchParams] = useSearchParams();

  const isIndex = type === 'index';
  const sysFieldId = 'sysField._id';
  const groupIdFilterCondition = filterConditions.find(
    (condition) => condition.id === DEVICE_GROUP_ID
  );
  const templateIdFilterCondition = filterConditions.find(
    (condition) => condition.id === DEVICE_TEMPLATES_ID
  );
  const keywordsCondition = filterConditions.find(
    (condition) => condition.id === KEYWORDS
  );
  const showDeviceGroup = !!groupIdFilterCondition;
  const showDeviceTemplates = !!templateIdFilterCondition;

  const statusQueryField = 'sysField._status';
  const deviceGroupIdQueryField = 'sysField._spacePath';
  const templateIdQueryField = 'basicInfo.templateId';

  const defaultDeviceListQueryConditions = [
    {
      field: 'type',
      operator: '$eq',
      value: 'device',
    },
  ];

  const [deviceListQueryConditions, setDeviceListQueryConditions] = useState<
    RequestDataCondition[]
  >(defaultDeviceListQueryConditions);

  const deviceGroupConditions: RequestDataCondition[] = [
    {
      field: 'type',
      operator: '$eq',
      value: 'group',
    },
  ];

  const searchGroupId = searchParams.get('group-id');
  if (searchGroupId && groupIdFilterCondition?.value) {
    deviceGroupConditions.push({
      field: sysFieldId,
      operator: '$wildcard',
      value: searchGroupId,
    });
  }

  const defaultTemplateConditions = useMemo(
    () => [
      {
        field: 'type',
        operator: '$eq',
        value: 'template',
      },
    ],
    []
  );

  const [templateConditions, setTemplateConditions] = useState<
    RequestDataCondition[]
  >(defaultTemplateConditions);

  const baseRequestData = {
    query: '',
    page_num: 1,
    page_size: 1000,
    order_by: 'name',
    is_descending: false,
  };

  const { deviceGroupTree, isLoading: isDeviceGroupLoading } =
    useDeviceGroupQuery({
      requestData: {
        ...baseRequestData,
        condition: [
          ...deviceGroupConditions,
          {
            field: 'group.name',
            operator: '$wildcard',
            value:
              !searchGroupId && showDeviceGroup
                ? groupIdFilterCondition.value
                : '',
          },
        ],
      },
    });

  const { deviceList, isLoading: isDeviceListLoading } = useDeviceListQuery({
    requestData: {
      ...baseRequestData,
      condition: [
        ...deviceListQueryConditions,
        {
          field: 'basicInfo.name',
          operator: '$wildcard',
          value: keywordsCondition?.value ?? '',
        },
      ],
    },
    enabled: showDeviceList,
  });

  const { templates, isLoading: isDeviceTemplatesLoading } =
    useDeviceTemplatesQuery({
      requestData: {
        ...baseRequestData,
        condition: [
          ...templateConditions,
          {
            field: 'basicInfo.name',
            operator: '$wildcard',
            value: showDeviceTemplates ? templateIdFilterCondition.value : '',
          },
        ],
      },
    });

  const handleStatusChange = (deviceStatus: Status) => {
    let newDeviceListQueryConditions = [...deviceListQueryConditions];
    const statusQueryCondition = newDeviceListQueryConditions.find(
      (queryCondition) => queryCondition.field === statusQueryField
    );

    const { value: statusValue } = deviceStatus;
    if (statusQueryCondition) {
      if (statusValue === 'all') {
        newDeviceListQueryConditions = newDeviceListQueryConditions.filter(
          (queryCondition) => queryCondition.field !== statusQueryField
        );
        setDeviceListQueryConditions(newDeviceListQueryConditions);
      } else {
        statusQueryCondition.value = statusValue;
        setDeviceListQueryConditions(newDeviceListQueryConditions);
      }
    } else {
      setDeviceListQueryConditions([
        ...newDeviceListQueryConditions,
        {
          field: statusQueryField,
          operator: '$eq',
          value: statusValue,
        },
      ]);
    }
    setStatus(deviceStatus);
  };

  const handleDeviceGroupTitleClick = ({
    groupId,
    title,
  }: {
    groupId: string;
    title: string;
  }) => {
    if (isIndex) {
      const newDeviceListQueryConditions = [
        ...deviceListQueryConditions.filter(
          (condition) => condition.field !== templateIdQueryField
        ),
      ];
      const groupIdCondition = newDeviceListQueryConditions.find(
        (queryCondition) => queryCondition.field === deviceGroupIdQueryField
      );
      if (groupIdCondition) {
        groupIdCondition.value = groupId;
        setDeviceListQueryConditions(newDeviceListQueryConditions);
      } else {
        setDeviceListQueryConditions([
          ...deviceListQueryConditions,
          {
            field: deviceGroupIdQueryField,
            operator: '$wildcard',
            value: groupId,
          },
        ]);
      }

      setShowDeviceList(true);
    } else {
      hideFilterDropdown();
    }

    setDeviceGroupId(groupId);
    handleUpdateCondition({
      updateCondition: { id: DEVICE_GROUP_ID, value: title },
    });
  };

  const handleDeviceListBackBtnClick = () => {
    setShowDeviceList(false);
    if (showDeviceGroup) {
      handleUpdateCondition({
        updateCondition: { id: DEVICE_GROUP_ID, value: '' },
        removeConditionId: KEYWORDS,
      });
    } else if (showDeviceTemplates) {
      handleUpdateCondition({
        updateCondition: { id: DEVICE_TEMPLATES_ID, value: '' },
        removeConditionId: KEYWORDS,
      });
    }
  };

  const handleTemplateClick = ({
    templateId: id,
    templateName,
  }: {
    templateId: string;
    templateName: string;
  }) => {
    if (isIndex) {
      const newDeviceListQueryConditions = [
        ...deviceListQueryConditions.filter(
          (condition) => condition.field !== deviceGroupIdQueryField
        ),
      ];
      const templateIdCondition = newDeviceListQueryConditions.find(
        (queryCondition) => queryCondition.field === templateIdQueryField
      );
      if (templateIdCondition) {
        templateIdCondition.value = id;
        setDeviceListQueryConditions(newDeviceListQueryConditions);
      } else {
        setDeviceListQueryConditions([
          ...deviceListQueryConditions,
          {
            field: templateIdQueryField,
            operator: '$wildcard',
            value: id,
          },
        ]);
      }

      setTemplateConditions([
        ...templateConditions,
        {
          field: sysFieldId,
          operator: '$eq',
          value: id,
        },
      ]);

      setShowDeviceList(true);
    } else {
      hideFilterDropdown();
    }

    setTemplateId(id);
    handleUpdateCondition({
      updateCondition: { id: DEVICE_TEMPLATES_ID, value: templateName },
    });
  };

  useEffect(() => {
    const templateConditionId = templateIdFilterCondition?.id;
    if (!templateConditionId || templateConditionId !== DEVICE_GROUP_ID) {
      setTemplateConditions(defaultTemplateConditions);
    }
  }, [
    templateIdFilterCondition,
    setTemplateConditions,
    defaultTemplateConditions,
  ]);

  return (
    <Flex
      flexDirection="column"
      position="absolute"
      zIndex="2"
      padding="8px 20px 20px"
      width="100%"
      maxHeight="450px"
      backgroundColor="white"
      boxShadow="0px 8px 8px rgba(182, 194, 205, 0.2)"
      borderRadius="4px"
      {...style}
    >
      <FilterConditionSelect
        disabled={
          !groupIdFilterCondition &&
          !templateIdFilterCondition &&
          !!keywordsCondition
        }
        filterConditionId={
          groupIdFilterCondition?.id || templateIdFilterCondition?.id || ''
        }
        handleConditionClick={handleConditionClick}
      />
      <ResultContent
        status={status}
        onStatusChange={handleStatusChange}
        isDeviceGroupLoading={isDeviceGroupLoading}
        showDeviceGroup={showDeviceGroup}
        deviceGroupTree={deviceGroupTree}
        // clearDeviceGroupId={() => setDeviceGroupId('')}
        // clearTemplateId={() => setTemplateId('')}
        showBackButton={Boolean(
          groupIdFilterCondition || templateIdFilterCondition
        )}
        showDeviceList={showDeviceList}
        isDeviceListLoading={isDeviceListLoading}
        deviceList={deviceList}
        onDeviceListBackBtnClick={handleDeviceListBackBtnClick}
        onTemplateClick={handleTemplateClick}
        showDeviceTemplates={showDeviceTemplates}
        isDeviceTemplatesLoading={isDeviceTemplatesLoading}
        templates={templates}
        onDeviceGroupTitleClick={handleDeviceGroupTitleClick}
      />
    </Flex>
  );
}
