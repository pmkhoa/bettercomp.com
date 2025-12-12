'use client';
import { useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';
import { SearchIcon } from '@/components/Icons';
import { Button, Field, Input } from '@headlessui/react';
import cn from 'classnames';

function SearchBox({
  onSearchSubmit,
  searchTerm = '',
  className = '',
}: {
  onSearchSubmit?: () => void;
  searchTerm?: string;
  className?: string;
}) {
  const [searchTerms, setSearchTerms] = useState(searchTerm || '');
  const router = useRouter();

  return (
    <Suspense>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          router.push(`/search?s=${searchTerms}`, {
            scroll: false,
          });
          if (onSearchSubmit) {
            onSearchSubmit();
          }
        }}
        className="w-full max-w-[600px]"
      >
        <Field className="field-row relative">
          <Input
            className={cn(
              'flex w-full p-3 border rounded-sm border-2 border-gray-200/20',
              'data-[focus]:outline-1 data-[focus]:-outline-offset-0 data-[focus]:outline-blue',
              className
            )}
            value={searchTerms}
            name="terms"
            onChange={(e) => setSearchTerms(e.currentTarget.value)}
            placeholder="Search by keyword"
          />
          <Button type="submit" className="absolute right-4 top-[50%] -translate-y-[50%]">
            <SearchIcon />
          </Button>
        </Field>
      </form>
    </Suspense>
  );
}

export default SearchBox;
