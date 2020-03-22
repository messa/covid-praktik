import React from 'react';
import Link from 'next/link';

import Message from 'Components/Message';
import Wrapper from 'Components/Wrapper';

export default function NotLoggedIn() {
    return (
        <Wrapper condensed>
            <Message>
                <p>Prosím, <Link href='/'><a>přihlašte se</a></Link>.</p>
            </Message>
        </Wrapper>
    );
}