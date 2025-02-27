import { Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { Column } from 'react-table';

import { SearchInput, Table } from '@tkeel/console-components';
import { usePagination } from '@tkeel/console-hooks';
import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

import usePluginsTenantsQuery, {
  Tenant,
} from '@/tkeel-console-plugin-admin-plugins/hooks/queries/usePluginsTenantsQuery';

type Props = {
  pluginName: string;
  uninstall: boolean;
};

function EnablePluginList({ pluginName, uninstall }: Props) {
  const [keyWords, setKeywords] = useState('');
  const { pageNum, pageSize, setTotalSize, ...rest } = usePagination();

  const { tenants, data, isLoading, isSuccess } = usePluginsTenantsQuery({
    pluginName,
    pageNum,
    pageSize,
    keyWords,
    enabled: !uninstall,
  });

  if (isSuccess) {
    setTotalSize(data?.total ?? 0);
  }

  const columns: ReadonlyArray<Column<Tenant>> = [
    {
      Header: '启用时间',
      accessor: 'enable_timestamp',
      width: 200,
      disableSortBy: true,
      Cell({ value }) {
        return value
          ? formatDateTimeByTimestamp({ timestamp: `${value}000` })
          : '';
      },
    },
    {
      Header: '租户空间',
      accessor: 'title',
      width: 100,
    },
    {
      Header: '租户ID',
      accessor: 'tenant_id',
    },
    {
      Header: '管理员账号',
      accessor: 'operator_id',
      width: 280,
    },
    {
      Header: '备注',
      accessor: 'remark',
    },
    {
      Header: '用户数',
      accessor: 'user_num',
      width: 100,
    },
  ];

  return (
    <Flex
      flexDirection="column"
      height="100%"
      paddingTop="12px"
      backgroundColor="white"
    >
      <Flex
        marginBottom="12px"
        padding="0 20px"
        height="32px"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text color="gray.800" fontSize="14px" fontWeight="600">
          启用列表
        </Text>
        <SearchInput
          width="284px"
          placeholder="搜索"
          onSearch={(value) => setKeywords(value)}
          inputStyle={{ backgroundColor: 'white' }}
        />
      </Flex>
      <Table
        style={{ flex: 1, overflow: 'hidden', padding: '0 20px' }}
        columns={columns}
        data={tenants}
        isLoading={isLoading}
        isShowStripe
        scroll={{ y: '100%' }}
        paginationProps={{
          pageNum,
          pageSize,
          setTotalSize,
          ...rest,
        }}
      />
    </Flex>
  );
}

export default EnablePluginList;
