import React from "react";
import { User } from "../models/User";
import { Link } from "react-router-dom";
import { useStore } from "../store/module";
import { toAcctString } from "../helpers/toAcctString";

export function UserHeader(props: { user: User, onFollowButtonClicked?: (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void, }) {
    const u = props.user;
    const acct = toAcctString(u);
    const store = useStore();

    return (
        <div>
            <h1>{u.profileName || u.name}</h1>
            <p>ID: {acct} { u.isLocked ? "🔒" : "" }</p>
            <p>
                { u.isAdmin ? "[Admin]" : "" }
                { u.isModerator ? "[Mod]" : "" }
                { u.isBot ? "[BOT]" : "" }
                { u.isCat ? "[CAT]" : "" }
            </p>
            {
                u.isFreezed ? <p>"このユーザーは凍結されています。</p> : 
                <React.Fragment>
                    { 
                        u.isBlocked && u.isBlockingMe ? <p>相互ブロック状態です</p> :
                        u.isBlocked ? <p>ブロックしています</p> : 
                        u.isBlockingMe ? <p>ブロックされています</p> : null
                    }
                    { u.isFollowingMe ? <p>フォローされています</p> : null }
                    <p>{u.description || "自己紹介はありません。"}</p>
                    <p>
                        <Link to={`/@${u.name}`}>{u.postsCount} 投稿</Link>
                        &emsp;
                        <Link to={`/@${u.name}/following`}>{u.followingsCount} フォロー</Link>
                        &emsp;
                        <Link to={`/@${u.name}/followers`}>{u.followersCount} フォロワー</Link>
                    </p>
                    { 
                        store.user && u.id !== store.user.id ? 
                            <div>
                                <button onClick={(s) => { if (props.onFollowButtonClicked) { props.onFollowButtonClicked(s); }}}>
                                    {u.isFollowed ? "フォロー解除" : "フォローする"}
                                </button>
                            </div> 
                        : null 
                    }
                </React.Fragment>
            }
        </div>
    );
}