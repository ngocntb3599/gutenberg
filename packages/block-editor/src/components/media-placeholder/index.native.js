/**
 * External dependencies
 */
import { View, Text, TouchableWithoutFeedback } from 'react-native';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Dashicon } from '@wordpress/components';
import { default as withMediaUpload, MEDIA_TYPE_IMAGE, MEDIA_TYPE_VIDEO } from '../media-upload';

/**
 * Internal dependencies
 */
import styles from './styles.scss';

function MediaPlaceholder( props ) {
	const { mediaType, labels = {}, icon, onSelectURL } = props;

	const isImage = MEDIA_TYPE_IMAGE === mediaType;
	const isVideo = MEDIA_TYPE_VIDEO === mediaType;

	let placeholderTitle = labels.title;
	if ( placeholderTitle === undefined ) {
		placeholderTitle = __( 'Media' );
		if ( isImage ) {
			placeholderTitle = __( 'Image' );
		} else if ( isVideo ) {
			placeholderTitle = __( 'Video' );
		}
	}

	let placeholderIcon = icon;
	if ( placeholderIcon === undefined ) {
		if ( isImage ) {
			placeholderIcon = 'format-image';
		} else if ( isVideo ) {
			placeholderIcon = 'format-video';
		}
	}

	let instructions = labels.instructions;
	if ( instructions === undefined ) {
		if ( isImage ) {
			instructions = __( 'CHOOSE IMAGE' );
		} else if ( isVideo ) {
			instructions = __( 'CHOOSE VIDEO' );
		}
	}

	let accessibilityHint = __( 'Double tap to select' );
	if ( isImage ) {
		accessibilityHint = __( 'Double tap to select an image' );
	} else if ( isVideo ) {
		accessibilityHint = __( 'Double tap to select a video' );
	}

	return (
		<TouchableWithoutFeedback
			accessibilityLabel={ sprintf(
				/* translators: accessibility text for the media block empty state. %s: media type */
				__( '%s block. Empty' ),
				placeholderTitle
			) }
			accessibilityRole={ 'button' }
			accessibilityHint={ accessibilityHint }
			onPress={ props.presentMediaOptions }
		>
			<View style={ styles.emptyStateContainer }>
				{ props.getMediaOptionsPicker() }
				<Dashicon icon={ placeholderIcon } />
				<Text style={ styles.emptyStateTitle }>
					{ placeholderTitle }
				</Text>
				<Text style={ styles.emptyStateDescription }>
					{ instructions }
				</Text>
			</View>
		</TouchableWithoutFeedback>
	);
}

export default withMediaUpload(
	MediaPlaceholder,
	props => props.mediaType,
	(props, mediaId, mediaURL) => props.onSelectURL(mediaId, mediaURL)
);
