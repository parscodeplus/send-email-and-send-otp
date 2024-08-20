
type NoticeProps = {
  message: string
}

export const Notice = ({ message }: NoticeProps) => {
  return (
    <>
      <h3 className={'mb-5 text-white'}>WebPush PWA</h3>
      <p className={'text-center'}>{message}</p>
    </>
  )
}
