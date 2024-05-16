import React, { Component, ReactElement } from "react";
import moment, { Moment } from "moment/moment";
import "@fortawesome/fontawesome-free/css/all.css";
import "./index.css";

interface Day {
  name: string;
  number: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  date: Moment;
}

interface WeekProps {
  date: Moment;
  month: Moment;
  selected: Moment;
  select: (day: Moment) => void;
}

class Week extends Component<WeekProps> {
  renderDays = (): ReactElement[] => {
    const { date, month, selected, select } = this.props;
    const days: ReactElement[] = [];

    let currentDate = date.clone().startOf("week");

    for (let i = 0; i < 7; i++) {
      const day: Day = {
        name: currentDate.format("dd").substring(0, 1),
        number: currentDate.date(),
        isCurrentMonth: currentDate.month() === month.month(),
        isToday: currentDate.isSame(new Date(), "day"),
        date: currentDate.clone(),
      };

      days.push(
        <DayComponent
          key={currentDate.toString()}
          day={day}
          selected={selected}
          select={select}
        />
      );

      currentDate = currentDate.clone().add(1, "day");
    }

    return days;
  };

  render() {
    return <div className="row week">{this.renderDays()}</div>;
  }
}

interface DayProps {
  day: Day;
  selected: Moment;
  select: (day: Moment) => void;
}

const DayComponent: React.FC<DayProps> = ({ day, selected, select }) => {
  return (
    <span
      className={
        "day" +
        (day.isToday ? " today" : "") +
        (day.isCurrentMonth ? "" : " different-month") +
        (day.date.isSame(selected, "day") ? " selected" : "")
      }
      onClick={() => select(day.date)}
    >
      {day.number}
    </span>
  );
};

interface CalendarProps {
  onDateSelect: (date: Moment) => void;
  calendarName: string; // Nouvelle prop pour le nom du calendrier
}

interface CalendarState {
  month: Moment;
  selected: Moment;
  errorMessage: string | null;
}

class Calendar extends Component<CalendarProps, CalendarState> {
  constructor(props: CalendarProps) {
    super(props);

    this.state = {
      month: moment(),
      selected: moment().startOf("day"),
      errorMessage: null,
    };
  }

  previous = () => {
    this.setState({
      month: this.state.month.clone().subtract(1, "month"),
    });
  };

  next = () => {
    this.setState({
      month: this.state.month.clone().add(1, "month"),
    });
  };

  select = (day: Moment) => {
    const today = moment().startOf("day");
    const minDepartureDate = today.clone().add(2, "days");
    const maxArrivalDate = minDepartureDate.clone().add(30, "days");

    let errorMessage = null;

    if (
      this.props.calendarName === "Departure" &&
      day.isBefore(minDepartureDate)
    ) {
      errorMessage =
        "La date de départ doit être au moins deux jours à l'avance.";
    }

    if (this.props.calendarName === "Arrival" && day.isAfter(maxArrivalDate)) {
      errorMessage =
        "La date d'arrivée ne peut pas être plus de 30 jours après la date de départ.";
    }

    if (!errorMessage) {
      errorMessage = null;
    }

    if (!errorMessage) {
      this.props.onDateSelect(day);
    }
    this.setState({
      selected: day,
      month: day.clone(),
      errorMessage: errorMessage,
    });

    if (!errorMessage) {
      this.props.onDateSelect(day);
    }
  };

  renderMonthLabel = (): string => {
    return `${this.props.calendarName} - ${this.state.month.format(
      "MMMM YYYY"
    )}`;
  };

  render() {
    return (
      <section className="calendar">
        <header className="header">
          <div className="month-display row">
            <i className="arrow fa fa-angle-left" onClick={this.previous} />
            <span className="month-label">{this.renderMonthLabel()}</span>
            <i className="arrow fa fa-angle-right" onClick={this.next} />
          </div>
          <DayNames />
        </header>
        {this.state.errorMessage && (
          <div role="alert" className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{this.state.errorMessage}</span>
          </div>
        )}
        <div className="weeks">
          {this.renderWeeks(this.state.month, this.state.selected)}
        </div>
      </section>
    );
  }

  renderWeeks = (month: Moment, selected: Moment): ReactElement[] => {
    const weeks: ReactElement[] = [];
    let done = false;
    let currentDate = month.clone().startOf("month").startOf("week");

    while (!done) {
      weeks.push(
        <Week
          key={currentDate.toString()}
          date={currentDate.clone()}
          month={month}
          selected={selected}
          select={this.select}
        />
      );

      currentDate.add(1, "week");

      done = weeks.length > 2 && currentDate.month() !== month.month();
    }

    return weeks;
  };
}

class DayNames extends Component {
  render() {
    return (
      <div className="row day-names">
        <span className="day">S</span>
        <span className="day">M</span>
        <span className="day">T</span>
        <span className="day">W</span>
        <span className="day">T</span>
        <span className="day">F</span>
        <span className="day">S</span>
      </div>
    );
  }
}

export default Calendar;
