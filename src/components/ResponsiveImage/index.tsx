import React, { useState } from 'react'

import { toSizedImageURL, ToSizedImageURLSize } from '~/common/utils'

/**
 * Responsive Image
 */

interface ResponsiveImageProps {
  url: string
  size: ToSizedImageURLSize
  smUpSize?: ToSizedImageURLSize
  disabled?: boolean
  loading?: 'eager' | 'lazy'
}

const BaseResponsiveImage = ({
  url,
  size,
  smUpSize,
  disabled,
  loading,
}: ResponsiveImageProps) => {
  const [error, setError] = useState(false)

  // const isGIF = /gif/i.test(url)

  // Fallback to the raw `url` if manually disable or responsive image is failed to load
  if (disabled || error) {
    return <img src={url} loading={loading} alt="" />
  }

  return (
    <picture onError={() => setError(true)}>
      {smUpSize && (
        <>
          <source
            type="image/webp"
            media="(min-width: 768px)"
            srcSet={toSizedImageURL({
              url,
              size: smUpSize,
              ext: 'webp',
            })}
          />
          <source
            media="(min-width: 768px)"
            srcSet={toSizedImageURL({ url, size: smUpSize })}
          />
        </>
      )}

      <source
        type="image/webp"
        srcSet={toSizedImageURL({
          url,
          size,
          ext: 'webp',
        })}
      />

      <img
        src={url}
        srcSet={toSizedImageURL({ url, size })}
        loading={loading}
        alt=""
      />
    </picture>
  )
}

/**
 * Memoizing
 */
type MemoizedResponsiveImage = React.MemoExoticComponent<
  React.FC<ResponsiveImageProps>
>

export const ResponsiveImage = React.memo(
  BaseResponsiveImage,
  (prevProps, props) => {
    return (
      prevProps.url === props.url &&
      prevProps.size === props.size &&
      prevProps.smUpSize === props.smUpSize &&
      prevProps.disabled === props.disabled
    )
  }
) as MemoizedResponsiveImage
