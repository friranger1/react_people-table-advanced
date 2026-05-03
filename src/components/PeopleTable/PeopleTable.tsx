/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  persons: Person[];
};

export const PeopleTable = ({ persons }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSort(columnKey: string) {
    const params = new URLSearchParams(searchParams);
    const currentSort = params.get('sort');
    const currentOrder = params.get('order');

    if (currentSort !== columnKey) {
      params.set('sort', columnKey);
      params.set('order', 'asc');
    } else if (currentOrder === 'asc') {
      params.set('order', 'desc');
    } else {
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
  }

  const SortableHeader = ({}: { label: string; columnKey: string }) => (
    <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
      <span className="is-flex is-flex-wrap-nowrap">
        Name
        <span className="icon">
          <i
            className={cn('fas', {
              'fa-sort': searchParams.get('sort') !== 'name',
              'fa-sort-up':
                searchParams.get('sort') === 'name' &&
                searchParams.get('order') === 'asc',
              'fa-sort-down':
                searchParams.get('sort') === 'name' &&
                searchParams.get('order') === 'desc',
            })}
          />
        </span>
      </span>
    </th>
  );

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <SortableHeader label="Name" columnKey="name" />
          <SortableHeader label="Sex" columnKey="sex" />
          <SortableHeader label="Born" columnKey="born" />
          <SortableHeader label="Died" columnKey="died" />
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {persons.map(person => (
          <PersonLink key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
