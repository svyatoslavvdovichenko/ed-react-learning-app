import { Row } from 'antd/lib/grid'
import TextArea from 'antd/lib/input/TextArea'
import { Field, FieldProps } from 'formik'
import { FC, ReactNode } from 'react'

import { FieldContainer, StyledErrorMassege } from '../common/StyledComponents'

interface TextareaFieldProps {
  name: string
  placeholder?: string
  isPassword?: boolean
  label?: ReactNode
  $marginBottom?: number
}

export const TextareaField: FC<TextareaFieldProps> = ({
  name,
  placeholder,
  label,
  $marginBottom,
}) => {
  return (
    <FieldContainer $marginBottom={$marginBottom}>
      <Field name={name}>
        {({ field, meta: { error, touched } }: FieldProps) => (
          <>
            {label && <Row style={{ marginBottom: 10 }}>{label}</Row>}

            <TextArea placeholder={placeholder} {...field} />
          </>
        )}
      </Field>
      <StyledErrorMassege name={name} component="div" />
    </FieldContainer>
  )
}
