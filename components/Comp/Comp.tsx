function Comp({
  as,
  children,
  ...props
}: {
  [key: string]: any
  as: any
  children?: React.ReactNode
}): JSX.Element {
  const Component = as
  if (Component === 'input') {
    return <Component {...props} />
  }
  return <Component {...props}>{children}</Component>
}

export default Comp
