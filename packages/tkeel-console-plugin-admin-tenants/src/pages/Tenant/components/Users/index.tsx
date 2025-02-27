import { Flex, Text } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Cell, Column } from 'react-table';

import {
  ButtonsHStack,
  PageHeaderToolbar,
  Table,
} from '@tkeel/console-components';
import { usePagination } from '@tkeel/console-hooks';
import { User, useUsersQuery } from '@tkeel/console-request-hooks';
import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

import ResetPasswordButton from '../ResetPasswordButton';

export default function Users() {
  const { tenantId = '' } = useParams();
  const [keyWords, setKeyWords] = useState('');
  const pagination = usePagination();
  const { pageNum, pageSize, setPageNum, setTotalSize } = pagination;

  let params = {
    page_num: pageNum,
    page_size: pageSize,
    order_by: 'created_at',
    is_descending: true,
    key_words: '',
  };
  if (keyWords) {
    params = { ...params, key_words: keyWords };
  }
  const { isLoading, users } = useUsersQuery({
    tenantId,
    params,
    onSuccess(data) {
      const total = data?.data?.total ?? 0;
      setTotalSize(total);
    },
  });

  const columns: ReadonlyArray<Column<User>> = [
    {
      Header: '用户账号',
      accessor: 'username',
      Cell: ({ value }: { value: string }) =>
        useMemo(
          () => (
            <Text color="gray.800" fontWeight="600">
              {value}
            </Text>
          ),
          [value]
        ),
    },
    {
      Header: '用户名称',
      accessor: 'nick_name',
    },
    {
      Header: '创建时间',
      accessor: 'created_at',
      Cell({ value }) {
        return value ? formatDateTimeByTimestamp({ timestamp: value }) : '';
      },
    },
    {
      Header: '用户角色',
      accessor: 'roles',
      Cell({ value = [] }) {
        return value.map(({ name }) => name).join('，');
      },
    },
    {
      Header: '操作',
      Cell: ({ row }: Cell<User>) =>
        useMemo(() => {
          const { original } = row;

          return (
            <ButtonsHStack>
              <ResetPasswordButton data={original} />
            </ButtonsHStack>
          );
        }, [row]),
    },
  ];

  return (
    <Flex flexDirection="column" height="100%">
      <PageHeaderToolbar
        name="用户管理"
        hasSearchInput
        styles={{ wrapper: { margin: '4px 0' } }}
        searchInputProps={{
          onSearch(value) {
            setPageNum(1);
            setKeyWords(value.trim());
          },
        }}
      />
      <Table
        columns={columns}
        data={users}
        paginationProps={pagination}
        scroll={{ y: '100%' }}
        isLoading={isLoading}
        isShowStripe
        style={{ flex: 1, overflow: 'hidden', backgroundColor: 'whiteAlias' }}
      />
    </Flex>
  );
}
