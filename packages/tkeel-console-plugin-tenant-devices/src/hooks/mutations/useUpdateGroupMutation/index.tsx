import { useMutation } from '@tkeel/console-hooks';

const basicUrl = '/tkeel-device/v1/groups';
const method = 'PUT';
export interface ApiData {
  '@type': string;
}
export interface RequestData {
  description: string;
  ext: { [propName: string]: any };
  name: string;
  parentId?: string;
  parentName?: string;
}

export default function useUpdateGroupMutation({
  id,
  onSuccess,
}: {
  id: string;
  onSuccess?: () => void;
}) {
  return useMutation<ApiData, undefined, RequestData>({
    url: `${basicUrl}/${id}`,
    method,
    reactQueryOptions: { onSuccess },
  });
}
