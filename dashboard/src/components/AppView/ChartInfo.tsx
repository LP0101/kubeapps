import * as React from "react";
import { AlertTriangle, ArrowUpCircle, CheckCircle } from "react-feather";
import { Link } from "react-router-dom";

import { IRelease } from "shared/types";
import Card, { CardContent, CardFooter, CardGrid, CardIcon } from "../Card";

import placeholder from "../../placeholder.png";
import "./ChartInfo.css";

interface IChartInfoProps {
  app: IRelease;
}

class ChartInfo extends React.Component<IChartInfoProps> {
  public render() {
    const { app } = this.props;
    const name = app.name;
    const metadata = app.chart && app.chart.metadata;
    const icon = metadata && metadata.icon;
    const iconSrc = icon ? icon : placeholder;
    let notes = <span />;
    if (metadata) {
      notes = (
        <div>
          {metadata.appVersion && <div>App Version: {metadata.appVersion}</div>}
          <div>
            Chart Version: {metadata.version} {this.updateStatusInfo()}
          </div>
        </div>
      );
    }
    return (
      <CardGrid className="ChartInfo">
        <Card>
          <CardIcon icon={iconSrc} />
          <CardContent>
            <h5>{name}</h5>
            <p className="margin-b-reset">{metadata && metadata.description}</p>
          </CardContent>
          <CardFooter>
            <small>{notes}</small>
          </CardFooter>
        </Card>
      </CardGrid>
    );
  }

  private updateStatusInfo() {
    const { app } = this.props;
    // If update is not set yet we cannot know if there is
    // an update available or not
    if (app.updateInfo) {
      if (app.updateInfo.error) {
        return (
          <div>
            <AlertTriangle
              color="white"
              fill="#FDBA12"
              className="icon"
              size={15}
              style={{ bottom: "-0.2em" }}
            />{" "}
            <span>Update check failed. {app.updateInfo.error.message}</span>
          </div>
        );
      }
      if (app.updateInfo.upToDate) {
        return (
          <span>
            -{" "}
            <CheckCircle color="#82C341" className="icon" size={15} style={{ bottom: "-0.2em" }} />{" "}
            Up to date
          </span>
        );
      } else {
        return (
          <Link to={`/apps/ns/${app.namespace}/upgrade/${app.name}`}>
            <span>
              -{" "}
              <ArrowUpCircle
                color="white"
                className="icon"
                fill="#82C341"
                size={15}
                style={{ bottom: "-0.2em" }}
              />{" "}
              {app.updateInfo.latestVersion} available
            </span>
          </Link>
        );
      }
    }
    return;
  }
}

export default ChartInfo;
