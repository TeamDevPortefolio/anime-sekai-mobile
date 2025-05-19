// types/react-native-fast-image.d.ts
declare module 'react-native-fast-image' {
    import { ComponentType } from 'react';
    import {
        ImageProps,
        ImageStyle,
        ImageURISource,
        StyleProp
    } from 'react-native';
  
    type ResizeMode = 'contain' | 'cover' | 'stretch' | 'center';
    type Priority = 'low' | 'normal' | 'high';
  
    export interface FastImageSource extends ImageURISource {
      priority?: Priority;
      cache?: 'immutable' | 'web' | 'cacheOnly';
    }
  
    export interface FastImageProps extends Omit<ImageProps, 'source'> {
      source: FastImageSource | FastImageSource[];
      resizeMode?: ResizeMode;
      style?: StyleProp<ImageStyle>;
      tintColor?: string;
    }
  
    const FastImage: ComponentType<FastImageProps>;
  
    export default FastImage;
  }
  