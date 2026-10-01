import type * as React from 'react';
import {useEffect} from 'react';

type useOutsideClickClose = {
    isMenuOpen: boolean,
    rootRef:  React.RefObject<HTMLDivElement | null>;
    onOutsideClickClose: (openStatus: boolean) => void
}

export const useOutsideClickClose = ({
  isMenuOpen,
  rootRef, 
  onOutsideClickClose
}: useOutsideClickClose
  
): void => {
  useEffect(() => {

  if(!isMenuOpen) {
    return
  }

  const handlerOutsideClickClose = (e: MouseEvent): void => {
    const target = e.target as Node
    if(target && !rootRef.current?.contains(target)) {
      onOutsideClickClose(false)
    }
  }

  window.addEventListener('mousedown', handlerOutsideClickClose )

  return (): void => {
    window.removeEventListener('mousedown', handlerOutsideClickClose )
  }
}, [isMenuOpen, rootRef, onOutsideClickClose]) 
}