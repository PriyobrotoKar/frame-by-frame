import { useEffect } from 'react';
import {
  Control,
  DeepPartialSkipArrayKey,
  FieldValues,
  useWatch,
} from 'react-hook-form';
import useDebounce from './useDebounce';

interface UseFormWatchProps<T extends FieldValues> {
  control: Control<T>;
  defaultValues?: T;
  callbackFn?: (values: DeepPartialSkipArrayKey<T>) => void;
}

export default function useFormWatch<T extends FieldValues>({
  control,
  defaultValues,
  callbackFn,
}: UseFormWatchProps<T>) {
  const watchValues = useWatch<T>({
    control,
  });

  const debouncedValues = useDebounce(watchValues, 800);

  useEffect(() => {
    if (JSON.stringify(debouncedValues) === JSON.stringify(defaultValues))
      return;

    if (callbackFn) {
      console.log('Callback function executed with values:', debouncedValues);
      callbackFn(debouncedValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValues]);
}
