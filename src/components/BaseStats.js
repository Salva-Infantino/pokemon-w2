const BaseStats = ({pokemon}) => {

    const maxValue = 255;

    const getWidthByValue = (value) => {
        return value / (maxValue / 100);
    }

        return (
            <div className="BaseStats">
                {Object.entries(pokemon.BaseStats).map(([stat, value]) => (
                    <div key={stat} className="d-flex mb-2">
                        <div className="text-secondary w-35">{stat}</div>
                        <div className="mx-3 text-center w-15">{value}</div>
                        <div className="bg-light my-2 rounded-pill w-100 overflow-hidden">
                            <div className={`value-bar rounded-pill h-100 type-${pokemon.Types[0]}`} style={{width: `${getWidthByValue(value)}%`}}></div>
                        </div>
                    </div>
                ))}
            </div>
        )
}

export default BaseStats;