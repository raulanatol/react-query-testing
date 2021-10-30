export const TodoKeys = {
  all: ['todos'] as const,
  detail: (id) => [...TodoKeys.all, id] as const
};
