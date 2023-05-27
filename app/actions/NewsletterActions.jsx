// Actions supporting Newsletter subscriptions

import * as NewsletterAPI from 'NewsletterAPI';

export const NEWSLETTER_SUBSCRIBE = 'NEWSLETTER_SUBSCRIBE'


// --- NEWSLETTER SUBSCRIPTION ---

export const NEWSLETTER_SUBSCRIBE_SUCCESS   = 'NEWSLETTER_SUBSCRIBE_SUCCESS';

export var submitNewsletterSubscribeSuccess = () => {
    return {
        type: NEWSLETTER_SUBSCRIBE_SUCCESS
    };
}

export const NEWSLETTER_SUBSCRIBE_ERROR   = 'NEWSLETTER_SUBSCRIBE_ERROR';

export var submitNewsletterSubscribeError = (error) => {
    return {
        type: NEWSLETTER_SUBSCRIBE_ERROR,
        error
    };
}

export const SUBMIT_NEWSLETTER_SUBSCRIBE   = 'SUBMIT_NEWSLETTER_SUBSCRIBE';

export var submitNewsletterSubscribe = (email) => {
    return (dispatch, getState) => {
        NewsletterAPI.subscribe(email).then((result) => {
            if (result === {})
                dispatch(submitNewsletterSubscribeError("Subscription failed. Unknown Error."));
            else
                dispatch(submitNewsletterSubscribeSuccess());
        }).catch((error) => {
            console.log(error);
            dispatch(submitNewsletterSubscribeError("Subscription failed: " + error));
        });
    };
}
