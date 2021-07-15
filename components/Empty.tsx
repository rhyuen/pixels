import { FunctionComponent, ReactNode } from 'react';

interface Props {
    children: ReactNode
}

const Empty: FunctionComponent<Props> = ({ children }) => {
    return (
        <div className='card'>
            <h2>{children}</h2>
        </div>
    )
}

export default Empty;