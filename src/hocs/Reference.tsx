import { FC, useEffect } from 'react'
import { Loader } from '../components/common/Loader';
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector';

interface IReference {
  children: React.ReactNode
}

export const Reference: FC<IReference> = ({ children }) => {
  const { fetchReferences } = useActions();
  const { technologies } = useTypedSelector(state => state.referenceReducer);

  useEffect(()=> {
    fetchReferences()
  }, [])

  return (
    <>
      {technologies.length < 1 && (<Loader fullScreen/>)}
      {technologies.length >= 1 && (<>{children}</>)}
    </>
  )
  
}
