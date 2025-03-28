import 'bootstrap/dist/css/bootstrap.min.css';
import { AppCanvas } from '@hrbolek/uoisfrontend-gql-shared'
import { FirstEntity } from '@jakubvf/uoisfrontend-faculty';

export const App = () => {
    return (
        <AppCanvas>
            <FirstEntity />
        </AppCanvas>
    )
}
