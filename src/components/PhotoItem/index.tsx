import * as Component from './styles';
type Props = {
    url: string;
    name: string;
}
export const PhotoItem = ({url, name}: Props) =>{
    return(
        <Component.Container>
            <img src={url} alt={name}/>
            {name}
        </Component.Container>
    );
}