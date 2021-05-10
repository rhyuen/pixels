import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getUserDetails } from "../services/user";
import { UserDetails } from "../shared/types"

export default function Profile() {
    const [profile, setProfile] = useState<UserDetails | {}>({});
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {

        let mounted = true;
        getUserDetails()
            .then(res => {
                if (mounted) {
                    setProfile(res);
                }
            }).catch(e => {
                console.log(e);
                console.log('totally got an error');
                if (mounted) {
                    setError(true);
                }
            });

        return () => {
            mounted = false;
        }
    }, [])

    return (
        <Layout>
            <h1>Your Profile</h1>

            {
                error ?
                    <>Something went wrong.</> :
                    <>
                        <div>
                            <ul>
                                {
                                    Object.keys(profile).map((k, index) => {
                                        return (<li key={index}>{k}</li>)
                                    })
                                }
                            </ul>
                        </div>
                        <div>
                            <ul>
                                {
                                    Object.values(profile).map((v, index) => {
                                        return (<li key={index}>{v}</li>)
                                    })
                                }
                            </ul>
                        </div>
                    </>
            }
        </Layout>

    )
}