import { useTheme } from '@/features/providers/themeProvider';
import styles from './CardDetails.module.scss';
import { Spacecraft } from '@/entities/spacecraft/models';
import Loader from '@/shared/ui/loader/Loader';
import Button from '@/shared/ui/button/Button';
import { useRouter } from 'next/router';

interface Props {
  spacecraft: Spacecraft;
}

export default function CardDetails({ spacecraft }: Props) {
  const router = useRouter();



  // const { spacecraftId } = useParams();
  // const [searchParams] = useSearchParams();
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  const dark = useTheme();
  console.log('dark: ', dark);
  // const requestParams: SpaceCraftRequestParams = { endpoint: 'spacecraft', params: { uid: spacecraftId || '' } };

  const closeDetails = () => {
    const { query } = router;
    const { uid, ...newQuery } = query;
    router.push({ pathname: '/', query: { ...newQuery } });
  };

  // const { data, error, isFetching } = useGetItemQuery(requestParams);

  // useEffect(() => {
  //   if (data) {
  //     dispatch(saveDetails(data.spacecraft));
  //   }
  // }, [data, dispatch]);

  // if (error) {
  //   if (error) {
  //     throw new Error('Failed to fetch data details in CardDetails');
  //   }
  // }

  // if (isFetching || !data) {
  //   return (
  //     <aside className={styles.container} data-testid="card-details">
  //       <Loader />
  //     </aside>
  //   );
  // }

  // const { spacecraft } = data;

  const { name, spacecraftClass } = spacecraft;
  console.log('spacecraft: ', );

  const owner = spacecraft.owner ? spacecraft.owner.name : 'unknown';
  const registry = spacecraft.registry ? spacecraft.registry : 'unknown';
  const operator = spacecraft.operator ? spacecraft.operator.name : 'unknown';
  const dateStatus = spacecraft.dateStatus || 'unknown';
  const status = spacecraft.status || 'unknown';

  let containerClass = styles.container;
  if (dark) {
    containerClass += ` ${styles.dark}`;
  }

  const leftSide = (
    <div>
      <p>
        <strong>Registry code:</strong> {registry}
      </p>
      <p>
        <strong>Date of creation:</strong> {dateStatus}
      </p>
      <p>
        <strong>Owner:</strong> {owner}
      </p>
      <p>
        <strong>Managed By:</strong> {operator}
      </p>
      <p>
        <strong>Status:</strong> {status}
      </p>
    </div>
  );

  const rightSide = spacecraftClass ? (
    <div>
      <p>
        <strong>Class:</strong> {spacecraftClass.name}
      </p>
      <p>
        <strong>Crew:</strong> {spacecraftClass.crew || 'unknown'}
      </p>
      <p>
        <strong>activeFrom:</strong> {spacecraftClass.activeFrom}
      </p>
      <p>
        <strong>activeTo:</strong> {spacecraftClass.activeTo}
      </p>
    </div>
  ) : null;

  return (
    <aside className={containerClass} data-testid="card-details">
      <h3>
        <strong>Name:</strong> {name}
      </h3>
      <div className={styles.sides}>
        {leftSide}
        {rightSide}
      </div>
      <Button onClick={closeDetails}>Close details</Button>
    </aside>
  );
}
