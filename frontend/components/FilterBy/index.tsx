'use client';
import {
  Field,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { find, map, toLower, uniq } from 'lodash';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { CONTENT_TYPES } from '@/utils/constants';

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
    [searchParams]
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
                'relative flex p-4 text-left border border-gray-300 rounded-sm  w-full justify-between capitalize z-10 bg-sand font-bold',
                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
              )}
            >
              {find(CONTENT_TYPES, ['value', selectedType])?.title || selectedType}
              <span
                className="rounded-full bg-magenta flex items-center justify-center w-7 h-7 justify-center"
                aria-hidden="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="9"
                  viewBox="0 0 14 9"
                  fill="none"
                >
                  <path
                    d="M0.740234 0.827148C0.407774 1.19275 0.418057 1.74976 0.786133 2.10352L0.793945 2.11133L0.801758 2.11816L6.76172 7.375L7.09766 7.6709L7.42871 7.37012L13.2041 2.11328L13.2139 2.10352C13.6062 1.72642 13.5913 1.1178 13.1895 0.756836C12.8156 0.422048 12.2335 0.413835 11.8496 0.734375L11.8301 0.751953L7.08594 5.15625L2.16406 0.746094L2.15039 0.734375C1.76636 0.414468 1.18464 0.42169 0.810547 0.756836L0.740234 0.827148Z"
                    fill="#002952"
                    stroke="#002952"
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
                    uniqFilterList.length <= 6 ? `h-[${56 * uniqFilterList.length}px]` : `h-[270px]`
                  )}
                >
                  {uniqFilterList.map((filterListItem, index) => (
                    <ListboxOption
                      key={index}
                      value={
                        find(CONTENT_TYPES, ['value', filterListItem])?.title || filterListItem
                      }
                      className="data-[focus]:bg-sand cursor-pointer py-4 px-4 hover:bg-san capitalize"
                      onClick={() => {
                        router.push(
                          pathname + '?' + createQueryString(filterType, filterListItem),
                          { scroll: false }
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
