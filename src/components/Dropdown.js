import React from 'react';
import Select from 'react-select';
import '../style/Dropdown.scss';

export default class Dropdown extends React.Component {

  state = {
    neighborhood: { value: '', label: '' }
  }

  convertStringToNTACode = (ntaName) => {
    if (ntaName !== undefined && ntaName !== ''){
     return ntaName.replace(/[\s]/g, '%20');
    }
  }

  handleChange = (neighborhood) => {
    this.setState({
      neighborhood: { value: neighborhood.value, label: neighborhood.value }
    })
    this.props.updateNeighborhood(this.convertStringToNTACode(neighborhood.value), neighborhood.value);
  }

  render() {

    const neighborhoods = [
    'Allerton-Pelham Gardens',
    "Annadale-Huguenot-Prince's Bay-Eltingville",
    'Arden Heights',
    'Astoria',
    'Auburndale',
    'Baisley Park',
    'Bath Beach',
    'Battery Park City-Lower Manhattan',
    'Bay Ridge',
    'Bayside-Bayside Hills',
    'Bedford',
    'Bedford Park-Fordham North',
    'Bellerose',
    'Belmont',
    'Bensonhurst East',
    'Bensonhurst West',
    'Borough Park',
    'Briarwood-Jamaica Hills',
    'Brighton Beach',
    'Bronxdale',
    'Brooklyn Heights-Cobble Hill',
    'Brownsville',
    'Bushwick North',
    'Bushwick South',
    'Cambria Heights',
    'Canarsie',
    'Carroll Gardens-Columbia Street-Red Hook',
    'Central Harlem North-Polo Grounds',
    'Central Harlem South',
    'Charleston-Richmond Valley-Tottenville',
    'Chinatown',
    'Claremont-Bathgate',
    'Clinton',
    'Clinton Hill',
    'College Point',
    'Corona',
    'Crotona Park East',
    'Crown Heights North',
    'Crown Heights South',
    'Cypress Hills-City Line',
    'DUMBO-Vinegar Hill-Downtown Brooklyn-Boerum Hill',
    'Douglas Manor-Douglaston-Little Neck',
    'Dyker Heights',
    'East Concourse-Concourse Village',
    'East Elmhurst',
    'East Flatbush-Farragut',
    'East Flushing',
    'East Harlem North',
    'East Harlem South',
    'East New York',
    'East New York (Pennsylvania Ave)',
    'East Tremont',
    'East Village',
    'East Williamsburg',
    'Eastchester-Edenwald-Baychester',
    'Elmhurst',
    'Elmhurst-Maspeth',
    'Erasmus',
    'Far Rockaway-Bayswater',
    'Flatbush',
    'Flatlands',
    'Flushing',
    'Fordham South',
    'Forest Hills',
    'Fort Greene',
    'Fresh Meadows-Utopia',
    'Ft. Totten-Bay Terrace-Clearview',
    'Georgetown-Marine Park-Bergen Beach-Mill Basin',
    'Glen Oaks-Floral Park-New Hyde Park',
    'Glendale',
    'Gramercy',
    'Grasmere-Arrochar-Ft. Wadsworth',
    'Gravesend',
    'Great Kills',
    'Greenpoint',
    'Grymes Hill-Clifton-Fox Hills',
    'Hamilton Heights',
    'Hammels-Arverne-Edgemere',
    'Highbridge',
    'Hollis',
    'Homecrest',
    'Hunters Point-Sunnyside-West Maspeth',
    'Hunts Point',
    'Jackson Heights',
    'Jamaica',
    'Jamaica Estates-Holliswood',
    'Kensington-Ocean Parkway',
    'Kew Gardens',
    'Kew Gardens Hills',
    'Kingsbridge Heights',
    'Laurelton',
    'Lenox Hill-Roosevelt Island',
    'Lincoln Square',
    'Lindenwood-Howard Beach',
    'Longwood',
    'Lower East Side',
    'Madison',
    'Manhattanville',
    'Marble Hill-Inwood',
    "Mariner's Harbor-Arlington-Port Ivory-Graniteville",
    'Maspeth',
    'Melrose South-Mott Haven North',
    'Middle Village',
    'Midtown-Midtown South',
    'Midwood',
    'Morningside Heights',
    'Morrisania-Melrose',
    'Mott Haven-Port Morris',
    'Mount Hope',
    'Murray Hill',
    'Murray Hill-Kips Bay',
    'New Brighton-Silver Lake',
    'New Dorp-Midland Beach',
    'New Springville-Bloomfield-Travis',
    'North Corona',
    'North Riverdale-Fieldston-Riverdale',
    'North Side-South Side',
    'Norwood',
    'Oakland Gardens',
    'Oakwood-Oakwood Beach',
    'Ocean Hill',
    'Ocean Parkway South',
    'Old Astoria',
    'Old Town-Dongan Hills-South Beach',
    'Ozone Park',
    'Park Slope-Gowanus',
    'Parkchester',
    'Pelham Bay-Country Club-City Island',
    'Pelham Parkway',
    'Pomonok-Flushing Heights-Hillcrest',
    'Port Richmond',
    'Prospect Heights',
    'Prospect Lefferts Gardens-Wingate',
    'Queens Village',
    'Queensboro Hill',
    'Queensbridge-Ravenswood-Long Island City',
    'Rego Park',
    'Richmond Hill',
    'Ridgewood',
    'Rikers Island',
    'Rosedale',
    'Rossville-Woodrow',
    'Rugby-Remsen Village',
    'Schuylerville-Throgs Neck-Edgewater Park',
    'Seagate-Coney Island',
    'Sheepshead Bay-Gerritsen Beach-Manhattn Bch',
    'SoHo-TriBeCa-Civic Center-Little Italy',
    'Soundview-Bruckner',
    'Soundview-Castle Hill-Clason Point-Harding Park',
    'South Jamaica',
    'South Ozone Park',
    'Springfield Gardens North',
    'Springfield Gardens South-Brookville',
    'Spuyten Duyvil-Kingsbridge',
    'St. Albans',
    'Stapleton-Rosebank',
    'Starrett City',
    'Steinway',
    'Stuyvesant Heights',
    'Stuyvesant Town-Cooper Village',
    'Sunset Park East',
    'Sunset Park West',
    'Todt Hill-Emersn Hill-Heartland Villg-Lighthse Hill',
    'Turtle Bay-East Midtown',
    'University Heights-Morris Heights',
    'Upper East Side-Carnegie Hill',
    'Upper West Side',
    'Van Cortlandt Village',
    'Washington Heights North',
    'Washington Heights South',
    'West Brighton',
    'West Concourse',
    'West Farms-Bronx River',
    'West New Brighton-New Brighton-St. George',
    'West Village',
    'Westchester-Unionport',
    'Westerleigh',
    'Whitestone',
    'Williamsbridge-Olinville',
    'Williamsburg',
    'Windsor Terrace',
    'Woodhaven',
    'Woodlawn-Wakefield',
    'Woodside'
  ];

    const options = neighborhoods.map((neighborhood) => {
      return {value: neighborhood, label: neighborhood};
    });

    const selection = this.state.neighborhood.value === ''
      ?
      { value: this.props.neighborhood, label: this.props.neighborhood }
      :
      this.state.neighborhood;

    return (
      <div className='header'>
        <label>Neighborhood: </label>
        <Select
          id='dropdown'
          options={options}
          onChange={this.handleChange}
          value={selection}
        />
      </div>
    )
  }
}
