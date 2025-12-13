'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SearchIcon } from '@/components/Icons';
import { Button, Field, Input } from '@headlessui/react';
import cn from 'classnames';

type Props = {
  onSearchSubmit?: () => void;
  searchTerm?: string;
  className?: string;
};

export default function SearchBox({ onSearchSubmit, searchTerm = '', className = '' }: Props) {
  const router = useRouter();
  const [value, setValue] = useState(searchTerm);

  // ✅ Sync input when searchTerm changes (URL / parent update)
  useEffect(() => {
    setValue(searchTerm || '');
  }, [searchTerm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    router.push(`/search?s=${encodeURIComponent(value)}`, {
      scroll: false,
    });

    onSearchSubmit?.();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[600px]">
      <Field className="relative">
        <Input
          name="terms"
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          placeholder="Search by keyword"
          className={cn(
            'flex w-full p-3 border rounded-sm border-2 border-gray-200/20',
            'data-[focus]:outline-1 data-[focus]:-outline-offset-0 data-[focus]:outline-blue',
            className
          )}
        />

        <Button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2">
          <SearchIcon />
        </Button>
      </Field>
    </form>
  );
}
