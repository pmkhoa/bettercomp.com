'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CONTENT_TYPES } from '@/utils/constants';
import {
  Field,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import cn from 'classnames';
import { uniq, map, find, toLower } from 'lodash';

type Props = {
  filterList: string[];
  preFilterParam: string;
  filterLabel: string;
  filterType: string;
};

function FilterBy({ filterList, preFilterParam, filterLabel, filterType }: Props) {
  const [selectedType, setSelectedType] = useState(preFilterParam);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      // set new filter type
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    setSelectedType(preFilterParam);
  }, [preFilterParam]);

  const uniqFilterList = uniq(map(filterList, toLower));

  return (
    <Field className="max-w-full relative z-10">
      <Label>
        <div className="mb-2">
          <strong>{filterLabel}</strong>
        </div>
      </Label>
      <Listbox value={selectedType} onChange={setSelectedType} as="div">
        {({ open }) => (
          <>
            <ListboxButton
              className={cn(
                'relative flex p-4 text-left border border-black w-full justify-between capitalize z-10',
                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
              )}
            >
              {find(CONTENT_TYPES, ['value', selectedType])?.title || selectedType}
              <span
                className="rounded-full bg-magenta flex items-center justify-center w-7 h-7 justify-center"
                aria-hidden="true"
              >
                <svg
                  width="10"
                  height="8"
                  viewBox="0 0 10 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.86603 7.5C5.48113 8.16667 4.51887 8.16667 4.13397 7.5L0.669874 1.5C0.284974 0.833334 0.766099 0 1.5359 0L8.4641 0C9.2339 0 9.71503 0.833333 9.33013 1.5L5.86603 7.5Z"
                    fill="#3A495E"
                  />
                </svg>
              </span>
            </ListboxButton>

            <AnimatePresence>
              {open && (
                <ListboxOptions
                  static
                  as={motion.div}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  anchor="bottom"
                  className={cn(
                    'w-[var(--button-width)] rounded-md border border-gray [--anchor-gap:var(--spacing-2)] focus:outline-none origin-top mt-2 z-50 bg-white',
                    uniqFilterList.length <= 6
                      ? `h-[${56 * uniqFilterList.length}px]`
                      : `h-[370px]`,
                  )}
                >
                  {uniqFilterList.map((filterListItem, index) => (
                    <ListboxOption
                      key={index}
                      value={
                        find(CONTENT_TYPES, ['value', filterListItem])?.title || filterListItem
                      }
                      className="data-[focus]:bg-blue-100 cursor-pointer py-4 px-4 hover:bg-tan capitalize"
                      onClick={() => {
                        router.push(
                          pathname + '?' + createQueryString(filterType, filterListItem),
                          { scroll: false },
                        );
                      }}
                    >
                      {find(CONTENT_TYPES, ['value', filterListItem])?.title || filterListItem}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              )}
            </AnimatePresence>
          </>
        )}
      </Listbox>
    </Field>
  );
}

export default FilterBy;
