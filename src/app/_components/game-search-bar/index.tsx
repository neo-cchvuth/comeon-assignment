import { useRouter, useSearchParams } from 'next/navigation';

export default function GameSearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSearch = (value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set('q', value);
    router.replace('./?' + current.toString());
  };

  return (
    <div className="four wide column">
      <div className="search ui small icon input ">
        <input data-test="search" type="text" placeholder="Search Game" onChange={(e) => onSearch(e.target.value)} />
        <i className="search icon"></i>
      </div>
    </div>
  );
}
