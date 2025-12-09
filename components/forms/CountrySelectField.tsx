'use client'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Label } from '@/components/ui/label'
import { useMemo, useState } from 'react'
import countryList from 'react-select-country-list'
import { Controller } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { ChevronsUpDown } from 'lucide-react'

const CountrySelect = ({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) => {
  const [open, setOpen] = useState(false)
  const countries = useMemo(() => countryList().getData(), [])

  const getFlagEmoji = (countryCode: string) => {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map((ch) => 127397 + ch.charCodeAt(0))
    return String.fromCodePoint(...codePoints)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="country-select-trigger"
        >
          {value ? (
            <span className="flex items-center gap-2">
              <span className="size-6">{getFlagEmoji(value)}</span>
              <span>{countries.find((c) => c.value === value)?.label}</span>
            </span>
          ) : (
            'Select your country'
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-full p-0 border-gray-600">
        <Command className="bg-gray-800 border-gray-600">
          <CommandInput
            placeholder="Type a country or search..."
            className="country-select-input"
          />
          <CommandList className="max-h-60 bg-gray-800 scrollbar-hide-default">
            <CommandEmpty className="country-select-empty">
              No results found.
            </CommandEmpty>
            {countries.map((country) => (
              <CommandItem
                key={country.value}
                value={`${country.label} ${country.value}`}
                onSelect={() => {
                  onChange(country.value)
                  setOpen(false)
                }}
                className="country-select-item gap-2"
              >
                <span className="text-xl">{getFlagEmoji(country.value)}</span>
                <span>{country.label}</span>
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export const CountrySelectField = ({
  name,
  label,
  control,
  errors,
  required,
}: CountrySelectProps) => {
  return (
    <>
      <Label htmlFor={name} className="form-label">
        {label}
      </Label>
      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? `Please select ${label.toLowerCase()}` : false,
        }}
        render={({ field }) => (
          <CountrySelect value={field.value} onChange={field.onChange} />
        )}
      />
      {errors && <p className="text-xs text-red-500">{errors?.message}</p>}
      <p className="text-xs text-gray-500">
        Help us show market data and news relevant to you.
      </p>
    </>
  )
}
