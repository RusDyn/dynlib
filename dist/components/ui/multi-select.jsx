var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/* eslint-disable max-lines-per-function */
import { cva } from 'class-variance-authority';
import { CheckIcon, ChevronDown, WandSparkles, XCircle, XIcon } from 'lucide-react';
import * as React from 'react';
import { Badge } from '@/src/components/ui/badge';
import { Button } from '@/src/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/src/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/src/components/ui/popover';
import { Separator } from '@/src/components/ui/separator';
import { cn } from '@/src/lib/utils';
/**
 * Variants for the multi-select component to handle different styles.
 * Uses class-variance-authority (cva) to define different styles based on "variant" prop.
 */
var multiSelectVariants = cva('m-1 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110', {
    variants: {
        variant: {
            default: 'border-foreground/10 bg-card text-foreground hover:bg-card/80',
            secondary: 'border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80',
            destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
            inverted: 'inverted'
        }
    },
    defaultVariants: {
        variant: 'default'
    }
});
export var MultiSelect = React.forwardRef(function (_a, ref) {
    var options = _a.options, onValueChange = _a.onValueChange, variant = _a.variant, _b = _a.defaultValue, defaultValue = _b === void 0 ? [] : _b, _c = _a.placeholder, placeholder = _c === void 0 ? 'Select options' : _c, _d = _a.animation, animation = _d === void 0 ? 0 : _d, _e = _a.maxCount, maxCount = _e === void 0 ? 3 : _e, _f = _a.modalPopover, modalPopover = _f === void 0 ? false : _f, _g = _a.asChild, asChild = _g === void 0 ? false : _g, className = _a.className, props = __rest(_a, ["options", "onValueChange", "variant", "defaultValue", "placeholder", "animation", "maxCount", "modalPopover", "asChild", "className"]);
    var _h = React.useState(defaultValue), selectedValues = _h[0], setSelectedValues = _h[1];
    var _j = React.useState(false), isPopoverOpen = _j[0], setIsPopoverOpen = _j[1];
    var _k = React.useState(false), isAnimating = _k[0], setIsAnimating = _k[1];
    var handleInputKeyDown = function (event) {
        if (event.key === 'Enter') {
            setIsPopoverOpen(true);
        }
        else if (event.key === 'Backspace' && !event.currentTarget.value) {
            var newSelectedValues = __spreadArray([], selectedValues, true);
            newSelectedValues.pop();
            setSelectedValues(newSelectedValues);
            onValueChange(newSelectedValues);
        }
    };
    var toggleOption = function (option) {
        var newSelectedValues = selectedValues.includes(option)
            ? selectedValues.filter(function (value) { return value !== option; })
            : __spreadArray(__spreadArray([], selectedValues, true), [option], false);
        setSelectedValues(newSelectedValues);
        onValueChange(newSelectedValues);
    };
    var handleClear = function () {
        setSelectedValues([]);
        onValueChange([]);
    };
    var handleTogglePopover = function () {
        setIsPopoverOpen(function (prev) { return !prev; });
    };
    var clearExtraOptions = function () {
        var newSelectedValues = selectedValues.slice(0, maxCount);
        setSelectedValues(newSelectedValues);
        onValueChange(newSelectedValues);
    };
    var toggleAll = function () {
        if (selectedValues.length === options.length) {
            handleClear();
        }
        else {
            var allValues = options.map(function (option) { return option.value; });
            setSelectedValues(allValues);
            onValueChange(allValues);
        }
    };
    return (<Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen} modal={modalPopover}>
        <PopoverTrigger asChild={asChild}>
          <Button ref={ref} {...props} onClick={handleTogglePopover} className={cn('flex w-full p-1 rounded-md border min-h-10 h-auto items-center justify-between bg-inherit hover:bg-inherit', className)}>
            {selectedValues.length > 0 ? (<div className="flex w-full items-center justify-between">
                <div className="flex flex-wrap items-center">
                  {selectedValues.slice(0, maxCount).map(function (value) {
                var option = options.find(function (o) { return o.value === value; });
                var IconComponent = option === null || option === void 0 ? void 0 : option.icon;
                return (<Badge key={value} className={cn(isAnimating ? 'animate-bounce' : '', multiSelectVariants({ variant: variant }))} style={{ animationDuration: "".concat(animation, "s") }}>
                        {IconComponent && (<IconComponent className="mr-2 size-4"/>)}
                        {option === null || option === void 0 ? void 0 : option.label}
                        <XCircle className="ml-2 size-4 cursor-pointer" onClick={function (event) {
                        event.stopPropagation();
                        toggleOption(value);
                    }}/>
                      </Badge>);
            })}
                  {selectedValues.length > maxCount && (<Badge className={cn('bg-transparent text-foreground border-foreground/1 hover:bg-transparent', isAnimating ? 'animate-bounce' : '', multiSelectVariants({ variant: variant }))} style={{ animationDuration: "".concat(animation, "s") }}>
                      {"+ ".concat(selectedValues.length - maxCount, " more")}
                      <XCircle className="ml-2 size-4 cursor-pointer" onClick={function (event) {
                    event.stopPropagation();
                    clearExtraOptions();
                }}/>
                    </Badge>)}
                </div>
                <div className="flex items-center justify-between">
                  <XIcon className="mx-2 h-4 cursor-pointer text-muted-foreground" onClick={function (event) {
                event.stopPropagation();
                handleClear();
            }}/>
                  <Separator orientation="vertical" className="flex h-full min-h-6"/>
                  <ChevronDown className="mx-2 h-4 cursor-pointer text-muted-foreground"/>
                </div>
              </div>) : (<div className="mx-auto flex w-full items-center justify-between">
                <span className="mx-3 text-sm text-muted-foreground">
                  {placeholder}
                </span>
                <ChevronDown className="mx-2 h-4 cursor-pointer text-muted-foreground"/>
              </div>)}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start" onEscapeKeyDown={function () { return setIsPopoverOpen(false); }}>
          <Command>
            <CommandInput placeholder="Search..." onKeyDown={handleInputKeyDown}/>
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                <CommandItem key="all" onSelect={toggleAll} className="cursor-pointer">
                  <div className={cn('mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary', selectedValues.length === options.length
            ? 'bg-primary text-primary-foreground'
            : 'opacity-50 [&_svg]:invisible')}>
                    <CheckIcon className="size-4"/>
                  </div>
                  <span>(Select All)</span>
                </CommandItem>
                {options.map(function (option) {
            var isSelected = selectedValues.includes(option.value);
            return (<CommandItem key={option.value} onSelect={function () { return toggleOption(option.value); }} className="cursor-pointer">
                      <div className={cn('mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary', isSelected
                    ? 'bg-primary text-primary-foreground'
                    : 'opacity-50 [&_svg]:invisible')}>
                        <CheckIcon className="size-4"/>
                      </div>
                      {option.icon && (<option.icon className="mr-2 size-4 text-muted-foreground"/>)}
                      <span>{option.label}</span>
                    </CommandItem>);
        })}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup>
                <div className="flex items-center justify-between">
                  {selectedValues.length > 0 && (<>
                      <CommandItem onSelect={handleClear} className="flex-1 cursor-pointer justify-center">
                        Clear
                      </CommandItem>
                      <Separator orientation="vertical" className="flex h-full min-h-6"/>
                    </>)}
                  <CommandItem onSelect={function () { return setIsPopoverOpen(false); }} className="max-w-full flex-1 cursor-pointer justify-center">
                    Close
                  </CommandItem>
                </div>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
        {animation > 0 && selectedValues.length > 0 && (<WandSparkles className={cn('cursor-pointer my-2 text-foreground bg-background w-3 h-3', isAnimating ? '' : 'text-muted-foreground')} onClick={function () { return setIsAnimating(!isAnimating); }}/>)}
      </Popover>);
});
MultiSelect.displayName = 'MultiSelect';
