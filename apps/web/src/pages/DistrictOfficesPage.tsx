import React, { useState } from 'react';
import { MapPin, Phone, Mail, Building, Search, Shield, HelpCircle } from 'lucide-react';
import { Language } from '../types';

interface DistrictContact {
  district_name: string;
  district_name_ta: string;
  zone: string;
  collectorate_address: string;
  dadwo_officer: string;
  dadwo_phone: string;
  dadwo_email: string;
  dbcmwo_officer: string;
  dbcmwo_phone: string;
  dbcmwo_email: string;
  dswo_officer: string;
  dswo_phone: string;
}

const DISTRICT_DATA: DistrictContact[] = [
  {
    district_name: "Chennai",
    district_name_ta: "சென்னை",
    zone: "North",
    collectorate_address: "Singaravelar Maaligai, 62, Rajaji Salai, Chennai - 600001",
    dadwo_officer: "District Adi Dravidar & Tribal Welfare Officer, Ground Floor",
    dadwo_phone: "044-25268323",
    dadwo_email: "dadwochennai@nic.in",
    dbcmwo_officer: "District Backward Classes & Minorities Welfare Officer, 2nd Floor",
    dbcmwo_phone: "044-25264350",
    dbcmwo_email: "dbcmwochennai@nic.in",
    dswo_officer: "District Social Welfare Officer, 8th Floor, Singaravelar Maaligai",
    dswo_phone: "044-25268155"
  },
  {
    district_name: "Coimbatore",
    district_name_ta: "கோயம்புத்தூர்",
    zone: "West",
    collectorate_address: "District Collectorate Campus, State Bank Road, Coimbatore - 641018",
    dadwo_officer: "District Adi Dravidar & Tribal Welfare Officer, Room 104",
    dadwo_phone: "0422-2300062",
    dadwo_email: "dadwocbe@nic.in",
    dbcmwo_officer: "District BC & Minorities Welfare Officer, Room 202",
    dbcmwo_phone: "0422-2300078",
    dbcmwo_email: "dbcmwocbe@nic.in",
    dswo_officer: "District Social Welfare Officer, Collectorate Annexe",
    dswo_phone: "0422-2300261"
  },
  {
    district_name: "Madurai",
    district_name_ta: "மதுரை",
    zone: "South",
    collectorate_address: "District Collectorate, Gandhi Nagar, Madurai - 625020",
    dadwo_officer: "District Adi Dravidar & Tribal Welfare Officer, Block A",
    dadwo_phone: "0452-2531110",
    dadwo_email: "dadwomdu@nic.in",
    dbcmwo_officer: "District BC & Minorities Welfare Officer, Block B",
    dbcmwo_phone: "0452-2531145",
    dbcmwo_email: "dbcmwomdu@nic.in",
    dswo_officer: "District Social Welfare Officer, Collectorate Complex",
    dswo_phone: "0452-2530182"
  },
  {
    district_name: "Tiruchirappalli",
    district_name_ta: "திருச்சிராப்பள்ளி",
    zone: "Central",
    collectorate_address: "District Collectorate, Cantonment, Tiruchirappalli - 620001",
    dadwo_officer: "District Adi Dravidar Welfare Officer, Ground Floor",
    dadwo_phone: "0431-2410375",
    dadwo_email: "dadwotry@nic.in",
    dbcmwo_officer: "District BC & Minorities Welfare Officer, 1st Floor",
    dbcmwo_phone: "0431-2415668",
    dbcmwo_email: "dbcmwotry@nic.in",
    dswo_officer: "District Social Welfare Officer, Khajamalai Main Road",
    dswo_phone: "0431-2413788"
  },
  {
    district_name: "Salem",
    district_name_ta: "சேலம்",
    zone: "West",
    collectorate_address: "District Collectorate, Salem - 636001",
    dadwo_officer: "District Adi Dravidar & Tribal Welfare Officer",
    dadwo_phone: "0427-2450005",
    dadwo_email: "dadwoslm@nic.in",
    dbcmwo_officer: "District BC & Minorities Welfare Officer",
    dbcmwo_phone: "0427-2450012",
    dbcmwo_email: "dbcmwoslm@nic.in",
    dswo_officer: "District Social Welfare Officer",
    dswo_phone: "0427-2450020"
  },
  {
    district_name: "Tirunelveli",
    district_name_ta: "திருநெல்வேலி",
    zone: "South",
    collectorate_address: "District Collectorate Campus, Kokkirakulam, Tirunelveli - 627009",
    dadwo_officer: "District Adi Dravidar Welfare Officer",
    dadwo_phone: "0462-2500088",
    dadwo_email: "dadwotnv@nic.in",
    dbcmwo_officer: "District BC & Minorities Welfare Officer",
    dbcmwo_phone: "0462-2500115",
    dbcmwo_email: "dbcmwotnv@nic.in",
    dswo_officer: "District Social Welfare Officer",
    dswo_phone: "0462-2500140"
  },
  {
    district_name: "Thanjavur",
    district_name_ta: "தஞ்சாவூர்",
    zone: "Central",
    collectorate_address: "District Collectorate, Court Road, Thanjavur - 613001",
    dadwo_officer: "District Adi Dravidar Welfare Officer",
    dadwo_phone: "04362-230121",
    dadwo_email: "dadwotnj@nic.in",
    dbcmwo_officer: "District BC & Minorities Welfare Officer",
    dbcmwo_phone: "04362-230145",
    dbcmwo_email: "dbcmwotnj@nic.in",
    dswo_officer: "District Social Welfare Officer",
    dswo_phone: "04362-230230"
  },
  {
    district_name: "Vellore",
    district_name_ta: "வேலூர்",
    zone: "North",
    collectorate_address: "District Collectorate, Sathuvachari, Vellore - 632009",
    dadwo_officer: "District Adi Dravidar & Tribal Welfare Officer",
    dadwo_phone: "0416-2252110",
    dadwo_email: "dadwovlr@nic.in",
    dbcmwo_officer: "District BC & Minorities Welfare Officer",
    dbcmwo_phone: "0416-2252114",
    dbcmwo_email: "dbcmwovlr@nic.in",
    dswo_officer: "District Social Welfare Officer",
    dswo_phone: "0416-2252118"
  }
];

interface DistrictOfficesPageProps {
  language: Language;
}

export const DistrictOfficesPage: React.FC<DistrictOfficesPageProps> = ({ language }) => {
  const isTa = language === 'ta';
  const [search, setSearch] = useState('');
  const [selectedZone, setSelectedZone] = useState<string>('All');

  const filtered = DISTRICT_DATA.filter((d) => {
    const matchesSearch =
      d.district_name.toLowerCase().includes(search.toLowerCase()) ||
      d.district_name_ta.includes(search) ||
      d.collectorate_address.toLowerCase().includes(search.toLowerCase());
    const matchesZone = selectedZone === 'All' || d.zone === selectedZone;
    return matchesSearch && matchesZone;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="bg-gradient-to-r from-emerald-800 via-teal-700 to-cyan-800 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center space-x-3 mb-2">
          <Building className="w-8 h-8 text-emerald-200" />
          <h1 className="text-2xl font-bold">
            {isTa ? 'மாவட்ட நலத்துறை அலுவலர் தொடர்பு வழிகாட்டி' : 'District Welfare Officers & Collectorate Directory'}
          </h1>
        </div>
        <p className="text-emerald-100 text-sm max-w-2xl">
          {isTa
            ? 'தமிழ்நாட்டின் மாவட்ட ஆதிதிராவிடர் நல அலுவலர் (DADWO), பிற்படுத்தப்பட்டோர் நல அலுவலர் (DBCMWO), மற்றும் சமூக நல அலுவலர் (DSWO) நேரடி முகவரி மற்றும் தொடர்பு எண்கள்.'
            : 'Verified directory of District Welfare Nodal Officers (SC/ST, BC/MBC/Minorities, and Social Welfare) across Tamil Nadu collectorates for physical verification and grievance redressal.'}
        </p>
      </div>

      {/* 14417 State Helpline Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-amber-900">
        <div className="flex items-center space-x-3">
          <HelpCircle className="w-6 h-6 text-amber-600 flex-shrink-0" />
          <div>
            <p className="font-bold text-sm">
              {isTa ? 'தமிழ்நாடு அரசு 14417 உதவி எண்' : 'Tamil Nadu Government Welfare Helpline: 14417'}
            </p>
            <p className="text-xs text-amber-800">
              {isTa
                ? 'பள்ளிக் கல்வி மற்றும் அரசு நலத்திட்டங்கள் குறித்த இலவச தகவல் & குறைகளுக்கு 14417 எண்ணை அழைக்கவும்.'
                : 'Toll-free 24x7 citizen helpline for state scholarship queries, application tracking, and grievances.'}
            </p>
          </div>
        </div>
        <a
          href="tel:14417"
          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold shadow transition flex items-center gap-1.5"
        >
          <Phone className="w-3.5 h-3.5" />
          {isTa ? '14417 அழைக்கவும்' : 'Call 14417'}
        </a>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder={isTa ? 'மாவட்டம் அல்லது முகவரி தேடவும்...' : 'Search by district name or address...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          {['All', 'North', 'South', 'West', 'Central'].map((z) => (
            <button
              key={z}
              onClick={() => setSelectedZone(z)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                selectedZone === z
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {z}
            </button>
          ))}
        </div>
      </div>

      {/* District Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item) => (
          <div
            key={item.district_name}
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4 hover:border-emerald-300 hover:shadow-md transition"
          >
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  {item.zone} Zone
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-1">
                  {isTa ? item.district_name_ta : item.district_name}
                </h2>
              </div>
              <div className="flex items-center text-xs text-slate-500 gap-1">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span className="max-w-[200px] truncate">{item.collectorate_address}</span>
              </div>
            </div>

            {/* Officers details */}
            <div className="space-y-3 text-xs">
              {/* SC/ST DADWO */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex items-center text-slate-800 font-semibold mb-1">
                  <Shield className="w-3.5 h-3.5 text-indigo-600 mr-1.5" />
                  {isTa ? 'ஆதிதிராவிடர் & பழங்குடியினர் நல அலுவலகம் (SC/ST)' : 'Adi Dravidar & Tribal Welfare (DADWO)'}
                </div>
                <p className="text-slate-600 text-[11px] mb-2">{item.dadwo_officer}</p>
                <div className="flex flex-wrap gap-3 text-slate-700">
                  <a href={`tel:${item.dadwo_phone}`} className="flex items-center text-emerald-700 hover:underline">
                    <Phone className="w-3 h-3 mr-1" /> {item.dadwo_phone}
                  </a>
                  <a href={`mailto:${item.dadwo_email}`} className="flex items-center text-blue-700 hover:underline">
                    <Mail className="w-3 h-3 mr-1" /> {item.dadwo_email}
                  </a>
                </div>
              </div>

              {/* BC/MBC DBCMWO */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex items-center text-slate-800 font-semibold mb-1">
                  <Shield className="w-3.5 h-3.5 text-emerald-600 mr-1.5" />
                  {isTa ? 'பிற்படுத்தப்பட்டோர் & சிறுபான்மையினர் நலம் (BC/MBC/DNC)' : 'BC, MBC & Minorities Welfare (DBCMWO)'}
                </div>
                <p className="text-slate-600 text-[11px] mb-2">{item.dbcmwo_officer}</p>
                <div className="flex flex-wrap gap-3 text-slate-700">
                  <a href={`tel:${item.dbcmwo_phone}`} className="flex items-center text-emerald-700 hover:underline">
                    <Phone className="w-3 h-3 mr-1" /> {item.dbcmwo_phone}
                  </a>
                  <a href={`mailto:${item.dbcmwo_email}`} className="flex items-center text-blue-700 hover:underline">
                    <Mail className="w-3 h-3 mr-1" /> {item.dbcmwo_email}
                  </a>
                </div>
              </div>

              {/* DSWO */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex items-center text-slate-800 font-semibold mb-1">
                  <Shield className="w-3.5 h-3.5 text-pink-600 mr-1.5" />
                  {isTa ? 'மாவட்ட சமூக நல அலுவலர் (DSWO - புதுமைப் பெண்)' : 'District Social Welfare Officer (DSWO)'}
                </div>
                <p className="text-slate-600 text-[11px] mb-2">{item.dswo_officer}</p>
                <a href={`tel:${item.dswo_phone}`} className="flex items-center text-emerald-700 hover:underline">
                  <Phone className="w-3 h-3 mr-1" /> {item.dswo_phone}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
